import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

const casePlaceholders = [
  {
    title: 'Организация поставок для интернет-магазина',
    task: 'Найти поставщиков электроники в Китае, организовать регулярные поставки в Россию.',
    solution: 'Подобрали 5 проверенных фабрик, наладили цепочку поставок с консолидацией на нашем складе.',
    result: 'Снижение себестоимости на 30%, стабильные поставки каждые 2 недели.',
  },
  {
    title: 'Запуск private label на Amazon',
    task: 'Разработать продукт под собственным брендом и запустить продажи на Amazon.',
    solution: 'Нашли фабрику, зарегистрировали торговую марку, организовали производство и подготовку для FBA.',
    result: 'Успешный запуск бренда, 1000+ продаж в первый месяц.',
  },
  {
    title: 'Контейнерная поставка мебели в Казахстан',
    task: 'Организовать доставку 4 контейнеров мебели из Фошаня в Алматы.',
    solution: 'Мультимодальная доставка: авто + ж/д. Инспекция качества перед отправкой, полное таможенное оформление.',
    result: 'Доставка за 22 дня, экономия 25% по сравнению с предыдущим логистом клиента.',
  },
];

const Cases = () => {
  return (
    <>
      <PageHero
        title="Кейсы"
        subtitle="Примеры реализованных проектов — задачи, решения и результаты для наших клиентов."
        icon={Folder}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casePlaceholders.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 space-y-4"
              >
                <h3 className="text-lg font-bold text-card-foreground">{c.title}</h3>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Задача</span>
                  <p className="text-muted-foreground text-sm mt-1">{c.task}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Решение</span>
                  <p className="text-muted-foreground text-sm mt-1">{c.solution}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Результат</span>
                  <p className="text-muted-foreground text-sm mt-1">{c.result}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-12 italic">
            Это лишь часть наших проектов. Мы готовим подробные кейсы — следите за обновлениями.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Cases;
