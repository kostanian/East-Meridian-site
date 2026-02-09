import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Как быстро вы можете доставить груз из Китая?',
    a: 'Сроки зависят от вида транспорта: авиа — от 5 дней, ж/д — от 18 дней, море — от 25 дней. Точные сроки рассчитываем после анализа вашего груза.',
  },
  {
    q: 'Какой минимальный объём груза вы берёте?',
    a: 'Мы работаем с любыми объёмами — от одной коробки до полных контейнеров. Для небольших грузов используем консолидацию.',
  },
  {
    q: 'Как происходит оплата поставщику?',
    a: 'Мы переводим средства поставщику в юанях через легальные каналы. Вы получаете полный пакет закрывающих документов.',
  },
  {
    q: 'Можно ли проверить поставщика перед началом работы?',
    a: 'Да, мы проводим комплексную проверку контрагентов: лицензии, финансовое состояние, репутация, выездной аудит фабрики.',
  },
  {
    q: 'Работаете ли вы с маркетплейсами?',
    a: 'Да, мы подготавливаем товары для Amazon, Wildberries, Ozon и других площадок: маркировка, упаковка, фулфилмент.',
  },
  {
    q: 'Есть ли у вас офис в Китае?',
    a: 'Да, у нас собственный офис и склад в Гуанчжоу. Наши русскоязычные сотрудники решают задачи на месте.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Вопросы и ответы</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
            Частые <span className="text-gradient">вопросы</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
