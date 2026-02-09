import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Send as SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';

const contacts = [
  { icon: MapPin, label: 'Офис', value: 'Гуанчжоу, Китай' },
  { icon: Phone, label: 'Телефон', value: '+86 XXX XXXX XXXX' },
  { icon: Mail, label: 'Email', value: 'info@chinatrade.com' },
];

const Contacts = () => {
  return (
    <>
      <PageHero
        title="Контакты"
        subtitle="Свяжитесь с нами любым удобным способом. Мы отвечаем в течение 2 часов в рабочее время."
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-black text-foreground mb-8">Наши координаты</h2>
              <div className="space-y-6 mb-10">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{c.label}</div>
                      <div className="font-semibold text-foreground">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-foreground mb-4">Мессенджеры</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-xl" asChild>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="rounded-xl" asChild>
                  <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                    <SendIcon className="mr-2 h-4 w-4" />
                    Telegram
                  </a>
                </Button>
              </div>
            </div>

            {/* Lead form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <LeadForm title="Напишите нам" subtitle="Опишите задачу — мы предложим решение" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacts;
