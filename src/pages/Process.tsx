import { motion } from 'framer-motion';
import { ClipboardList, Search, Lightbulb, Rocket, BarChart3 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import LeadForm from '@/components/LeadForm';

const steps = [
  { icon: ClipboardList, number: '01', title: 'Заявка', description: 'Вы оставляете заявку или связываетесь с нами любым удобным способом. Описываете задачу и ожидания.' },
  { icon: Search, number: '02', title: 'Анализ задачи', description: 'Мы изучаем вашу задачу, оцениваем объём работ, сроки и возможные риски. Задаём уточняющие вопросы.' },
  { icon: Lightbulb, number: '03', title: 'Предложение решения', description: 'Формируем коммерческое предложение с чётким планом действий, стоимостью и сроками.' },
  { icon: Rocket, number: '04', title: 'Реализация', description: 'Выполняем задачу, держим вас в курсе на каждом этапе. Контролируем качество и сроки.' },
  { icon: BarChart3, number: '05', title: 'Отчётность', description: 'Предоставляем полный отчёт о выполненной работе с документами и рекомендациями.' },
];

const Process = () => {
  return (
    <>
      <PageHero
        title="Как мы работаем"
        subtitle="Прозрачный и понятный процесс — от вашей заявки до результата. Каждый этап контролируется и документируется."
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-16 bottom-0 w-px bg-border" />
                )}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 relative z-10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Этап {step.number}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-xl">
          <LeadForm title="Начнём?" subtitle="Оставьте заявку и мы приступим к первому этапу" />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Process;
