import { motion } from 'framer-motion';
import { Package, ShieldCheck, Warehouse, CreditCard, FileCheck, Globe } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'Доставка грузов',
    description: 'Морская, железнодорожная и авиа доставка из Китая в Россию и Казахстан. Консолидация, таможенное оформление, доставка до двери.',
    features: ['Все виды транспорта', 'Таможенное оформление', 'Страхование грузов'],
  },
  {
    icon: Warehouse,
    title: 'Склад и фулфилмент',
    description: 'Аренда площади на складе в Китае, приёмка товара, проверка качества, маркировка, упаковка и отправка.',
    features: ['Хранение товаров', 'Проверка качества', 'Маркировка и упаковка'],
  },
  {
    icon: FileCheck,
    title: 'Регистрация торговой марки',
    description: 'Полное сопровождение регистрации вашего бренда в Китае — защита интеллектуальной собственности.',
    features: ['Проверка уникальности', 'Подача заявки', 'Юридическая поддержка'],
  },
  {
    icon: ShieldCheck,
    title: 'Проверка контрагентов',
    description: 'Верификация китайских поставщиков и фабрик. Проверка лицензий, финансового состояния и репутации.',
    features: ['Аудит фабрик', 'Проверка документов', 'Отчёт о надёжности'],
  },
  {
    icon: CreditCard,
    title: 'Оплата поставщику',
    description: 'Безопасный перевод денег китайским поставщикам в юанях. Легальные схемы оплаты с полным пакетом документов.',
    features: ['Перевод в юанях', 'Полный пакет документов', 'Выгодный курс'],
  },
  {
    icon: Globe,
    title: 'Поиск товаров и фабрик',
    description: 'Найдём нужный товар или производителя в Китае. Переговоры, получение образцов, контроль производства.',
    features: ['Поиск поставщиков', 'Образцы продукции', 'Контроль производства'],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Что мы предлагаем</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
            Наши <span className="text-gradient">услуги</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Полный спектр бизнес-услуг для работы с Китаем — от поиска товара до доставки к вашей двери
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
