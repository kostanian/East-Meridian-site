import { motion } from 'framer-motion';
import { Building2, Globe, Users, ShieldCheck, Award, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

const stats = [
  { value: '8+', label: 'Лет на рынке' },
  { value: '5000+', label: 'Успешных отправок' },
  { value: '500+', label: 'Постоянных клиентов' },
  { value: '3', label: 'Офиса в Китае' },
];

const reasons = [
  { icon: MapPin, title: 'Присутствие в Китае', text: 'Собственные офисы и склады в ключевых городах Китая. Мы решаем задачи на месте.' },
  { icon: Users, title: 'Русскоязычная команда', text: 'Наши менеджеры говорят на русском, китайском и английском языках.' },
  { icon: ShieldCheck, title: 'Полная прозрачность', text: 'Чёткие договоры, фиксированные цены, никаких скрытых платежей и неожиданностей.' },
  { icon: Globe, title: 'Комплексный подход', text: 'Решаем все задачи «под ключ» — от поиска товара до доставки в ваш город.' },
  { icon: Award, title: 'Экспертиза', text: 'Глубокое знание китайского рынка, культуры ведения бизнеса и законодательства.' },
  { icon: Building2, title: 'Масштабируемость', text: 'Работаем с проектами любого масштаба — от единичных закупок до регулярных поставок.' },
];

const About = () => {
  return (
    <>
      <PageHero
        title="О компании"
        subtitle="ChinaTrade — ваша операционная инфраструктура в Китае. Мы создаём условия для эффективной работы бизнеса из России и Казахстана на китайском рынке."
        icon={Building2}
      />

      {/* Stats */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-black text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-foreground mb-12 text-center"
          >
            Почему нам <span className="text-gradient">доверяют</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border p-8"
              >
                <r.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-card-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;
