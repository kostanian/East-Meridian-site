import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
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

interface FormData {
  name: string;
  telegram: string;
  email: string;
  message: string;
}

const LeadForm = ({ title = 'Оставить заявку', subtitle = 'Опишите вашу задачу — мы свяжемся в течение 2 часов', compact = false }: LeadFormProps) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [missingField, setMissingField] = useState<'telegram' | 'email' | null>(null);
  const [pendingData, setPendingData] = useState<FormData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sendData = async (data: FormData) => {
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Ошибка при отправке');
      }

      setStatus('success');
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
    const data: FormData = {
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
