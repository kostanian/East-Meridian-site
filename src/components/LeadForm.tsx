import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const LeadForm = ({ title = 'Оставить заявку', subtitle = 'Опишите вашу задачу — мы свяжемся в течение 2 часов', compact = false }: LeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (submitted) {
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
          <Input placeholder="Ваше имя" required className="bg-background border-border" />
          <Input placeholder="Телефон" type="tel" required className="bg-background border-border" />
        </div>
        <Input placeholder="Email" type="email" className="bg-background border-border" />
        {!compact && (
          <Textarea placeholder="Опишите вашу задачу..." rows={4} className="bg-background border-border" />
        )}
        <Button type="submit" size="lg" className="w-full rounded-xl font-bold">
          <Send className="mr-2 h-4 w-4" />
          Отправить заявку
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;
