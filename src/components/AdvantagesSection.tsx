import { motion } from 'framer-motion';
import { Clock, Shield, Users, BadgePercent } from 'lucide-react';

const advantages = [
  {
    icon: Clock,
    title: 'Быстрые сроки',
    description: 'Оптимальные маршруты и проверенные логистические цепочки. Доставка от 12 дней.',
  },
  {
    icon: BadgePercent,
    title: 'Выгодные цены',
    description: 'Консолидация грузов и прямые контракты с перевозчиками — экономия до 40%.',
  },
  {
    icon: Shield,
    title: 'Полная прозрачность',
    description: 'Отслеживание на каждом этапе. Никаких скрытых платежей.',
  },
  {
    icon: Users,
    title: 'Команда в Китае',
    description: 'Собственный офис и склад в Гуанчжоу. Русскоязычные менеджеры на месте.',
  },
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Почему мы</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
            Наши <span className="text-gradient">преимущества</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <adv.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{adv.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
