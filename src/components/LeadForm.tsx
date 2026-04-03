import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

interface LeadData {
  name: string;
  telegram: string;
  email: string;
  message: string;
}

interface FilePayload {
  name: string;
  type: string;
  data: string;
}

const BLOCKED_EXTENSIONS = ['.exe', '.bat', '.cmd', '.sh', '.msi', '.dll'];
const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 4 * 1024 * 1024;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExtension(name: string): string {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const LeadForm = ({ title = 'Оставить заявку', subtitle = 'Опишите вашу задачу — мы свяжемся в течение 2 часов', compact = false }: LeadFormProps) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [missingField, setMissingField] = useState<'telegram' | 'email' | null>(null);
  const [pendingData, setPendingData] = useState<LeadData | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const remaining = MAX_TOTAL_SIZE - totalSize;

  const validateFiles = (list: File[]): string | null => {
    if (list.length > MAX_FILES) return `Максимум ${MAX_FILES} файлов`;

    for (const f of list) {
      if (BLOCKED_EXTENSIONS.includes(getExtension(f.name))) {
        return `Файл «${f.name}»: запрещённое расширение`;
      }
    }

    const total = list.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_SIZE) {
      return `Общий размер файлов (${formatSize(total)}) превышает лимит ${formatSize(MAX_TOTAL_SIZE)}`;
    }

    return null;
  };

  const handleFilesChange = (incoming: FileList | null) => {
    if (!incoming) return;
    setFileError('');
    const combined = [...files, ...Array.from(incoming)];
    const err = validateFiles(combined);
    if (err) {
      setFileError(err);
      return;
    }
    setFiles(combined);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const sendData = async (data: LeadData) => {
    setStatus('sending');
    setErrorMsg('');

    try {
      let filePayloads: FilePayload[] = [];
      if (files.length > 0) {
        filePayloads = await Promise.all(
          files.map(async (f) => ({
            name: f.name,
            type: f.type || 'application/octet-stream',
            data: await readAsBase64(f),
          })),
        );
      }

      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, files: filePayloads }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Ошибка при отправке');
      }

      setStatus('success');
      setFiles([]);
      formRef.current?.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ошибка при отправке');
      setStatus('error');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const data: LeadData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      telegram: (form.elements.namedItem('telegram') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim() ?? '',
    };

    if (!data.telegram && !data.email) {
      setErrorMsg('Укажите хотя бы один способ связи: Telegram или Email');
      setStatus('error');
      return;
    }

    if (!data.telegram) {
      setPendingData(data);
      setMissingField('telegram');
      return;
    }

    if (!data.email) {
      setPendingData(data);
      setMissingField('email');
      return;
    }

    sendData(data);
  };

  const handleSendWithout = () => {
    if (pendingData) {
      setMissingField(null);
      sendData(pendingData);
      setPendingData(null);
    }
  };

  const handleDialogClose = () => {
    setMissingField(null);
    setPendingData(null);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Заявка отправлена!</h3>
        <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
      </motion.div>
    );
  }

  const missingLabel = missingField === 'telegram' ? 'Telegram' : 'Email';

  return (
    <div>
      {!compact && (
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-foreground">{title}</h3>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className={`grid gap-4 ${compact ? '' : 'max-w-xl mx-auto'}`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input name="name" placeholder="Ваше имя" required className="bg-background border-border" />
          <Input name="telegram" placeholder="Ваш Telegram (@username)" className="bg-background border-border" />
        </div>
        <Input name="email" placeholder="Email" type="email" className="bg-background border-border" />
        {!compact && (
          <Textarea name="message" placeholder="Опишите вашу задачу..." rows={4} required className="bg-background border-border" />
        )}

        {/* File upload */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => { handleFilesChange(e.target.files); e.target.value = ''; }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length >= MAX_FILES}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <Paperclip className="h-4 w-4" />
            Прикрепить файл
          </button>
          <p className="text-xs text-muted-foreground mt-1">
            {files.length > 0
              ? `${files.length} из ${MAX_FILES} файлов · ${formatSize(totalSize)} из ${formatSize(MAX_TOTAL_SIZE)} · осталось ${formatSize(remaining)}`
              : `До ${MAX_FILES} файлов, общий размер до 4 МБ`}
          </p>
        </div>

        {/* Attached files list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} className="flex items-center gap-2 text-sm rounded-lg border border-border px-3 py-2 bg-background">
                <Paperclip className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate text-foreground">{f.name}</span>
                <span className="text-muted-foreground text-xs shrink-0">{formatSize(f.size)}</span>
                <button type="button" onClick={() => removeFile(i)} className="ml-auto text-muted-foreground hover:text-red-500 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {fileError && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {fileError}
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full rounded-xl font-bold" disabled={status === 'sending'}>
          <Send className="mr-2 h-4 w-4" />
          {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </form>

      <Dialog open={missingField !== null} onOpenChange={(open) => { if (!open) handleDialogClose(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Не указан {missingLabel}</DialogTitle>
            <DialogDescription>
              Вы не заполнили поле «{missingLabel}». Заполните его, чтобы мы могли связаться с вами альтернативным способом, или отправьте заявку без него.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleDialogClose}>
              Вернуться и заполнить
            </Button>
            <Button onClick={handleSendWithout}>
              Отправить без {missingLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadForm;
