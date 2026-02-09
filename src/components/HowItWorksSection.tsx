import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Заявка', description: 'Оставьте заявку или свяжитесь с нами. Обсудим задачу и подберём решение.' },
  { number: '02', title: 'Расчёт', description: 'Рассчитаем стоимость доставки, сроки и предложим оптимальный маршрут.' },
  { number: '03', title: 'Выкуп и проверка', description: 'Выкупим товар, проверим качество на складе, подготовим к отправке.' },
  { number: '04', title: 'Доставка', description: 'Отправим груз, оформим таможню. Вы получите товар с полным пакетом документов.' },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Процесс работы</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
            Как мы <span className="text-gradient">работаем</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center relative"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10 bg-background">
                <span className="text-3xl font-black text-primary">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
