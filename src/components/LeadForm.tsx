import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const LeadForm = ({ title = 'Оставить заявку', subtitle = 'Опишите вашу задачу — мы свяжемся в течение 2 часов', compact = false }: LeadFormProps) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      telegram: (form.elements.namedItem('telegram') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value ?? '',
    };

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
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ошибка при отправке');
      setStatus('error');
    }
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

  return (
    <div>
      {!compact && (
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-foreground">{title}</h3>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className={`grid gap-4 ${compact ? '' : 'max-w-xl mx-auto'}`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input name="name" placeholder="Ваше имя" required className="bg-background border-border" />
          <Input name="telegram" placeholder="Ваш Telegram (@username)" required className="bg-background border-border" />
        </div>
        <Input name="email" placeholder="Email" type="email" className="bg-background border-border" />
        {!compact && (
          <Textarea name="message" placeholder="Опишите вашу задачу..." rows={4} className="bg-background border-border" />
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
    </div>
  );
};

export default LeadForm;
