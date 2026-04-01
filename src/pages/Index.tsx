import { motion } from 'framer-motion';

import { Building2, Globe, Users, ShieldCheck, Award, MapPin, Phone, Mail, Send as SendIcon } from 'lucide-react';
import wechatQr from '@/assets/wechat-qr.jpg';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import LeadForm from '@/components/LeadForm';

import logisticsImg from '@/assets/services/logistics.jpg';
import warehouseServicesImg from '@/assets/services/warehouse-services.jpg';
import financialImg from '@/assets/services/financial.jpg';
import dealSupportImg from '@/assets/services/deal-support.jpg';
import legalImg from '@/assets/services/legal.jpg';
import interpreterImg from '@/assets/services/interpreter.jpg';

// About data

const reasons = [
  { icon: MapPin, title: 'Присутствие в Китае', text: 'Склады в ключевых городах Китая. Мы решаем задачи на месте.' },
  { icon: Users, title: 'Русскоязычная команда', text: 'Наши менеджеры говорят на русском, китайском и английском языках.' },
  { icon: ShieldCheck, title: 'Полная прозрачность', text: 'Придерживаемся достигнутых договоренностей, фиксированные цены, никаких скрытых платежей и неожиданностей.' },
  { icon: Globe, title: 'Комплексный подход', text: 'Решаем все задачи «под ключ» — от поиска товара до доставки в ваш город.' },
  { icon: Award, title: 'Экспертиза', text: 'Глубокое знание китайского рынка, культуры ведения бизнеса и законодательства.' },
  { icon: Building2, title: 'Масштабируемость', text: 'Работаем с проектами любого масштаба — от единичных закупок до регулярных поставок.' },
];

// Service cards with images
const serviceCards = [
  {
    title: 'Логистика',
    bullets: [
      'Авиа, авто, Ж/Д и морская доставка под ключ',
      'Контейнерные Ж/Д и морские перевозки',
      'Локальная доставка по Китаю курьерскими службами или независимыми транспортными маршрутами',
      'Международная отправка курьерскими службами (DHL, UPS, FedEx и др.)',
    ],
    image: logisticsImg,
  },
  {
    title: 'Складские услуги',
    bullets: [
      'Приём и обработка грузов на складах в Гуанчжоу и Иу',
      'Упаковка и маркировка для маркетплейсов: Amazon, Wildberries, Ozon и других',
      'Приём и проверка грузов. Упаковка в скотч, деревянный короб, гидравлическая прессовка и обрешетка.',
      'Временное хранение грузов и сдача в субаренду складских площадей',
      'Услуги грузчиков, погрузки и разгрузки с применением спецтехники (форклифт и др.)',
    ],
    image: warehouseServicesImg,
  },
  {
    title: 'Финансовые операции',
    bullets: [
      'Переводы денег в Китай, оплата поставщикам',
      'Выкуп товаров с торговых площадок 1688, Taobao, Pinduoduo, JD.com и др.',
      'Денежные переводы юаней в Китай и из Китая',
    ],
    image: financialImg,
  },
  {
    title: 'Сопровождение сделок',
    bullets: [
      'Поиск надёжных производителей по всему Китаю',
      'Инспекция товара и контроль качества перед отправкой',
      'Поиск производителей и проверка поставщика',
    ],
    image: dealSupportImg,
  },
  {
    title: 'Юридическая поддержка',
    bullets: [
      'Регистрация торговой марки в Китае и Гонконге',
      'Регистрация компании в Китае и Гонконге',
      'Сопровождение в оформлении миграционных документов для получения ВНЖ, визы и т.д.',
    ],
    image: legalImg,
  },
  {
    title: 'Услуги переводчика',
    bullets: [
      'Письменный и устный перевод',
      'Сопровождение переводчика на переговорах, выставках и производстве в Китае',
      'Участие в переговорах',
    ],
    image: interpreterImg,
  },
];

// Cases
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

const contacts = [
  { icon: MapPin, label: 'Мы находимся в', value: 'Гуанчжоу, Китай' },
  { icon: Phone, label: 'Телефон', value: '+86 XXX XXXX XXXX' },
  { icon: Mail, label: 'Email', value: 'info@eastmeridian.com' },
];

const Index = () => {

  return (
    <>
      <HeroSection />

      {/* Services overview */}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-3">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-10 text-sm italic max-w-2xl mx-auto">
            Перечень услуг не ограничивается указанными. По запросу клиента мы можем организовать и реализовать индивидуальные проекты и задачи любой сложности в Китае.
          </p>
        </div>
      </section>

      <AdvantagesSection />

      {/* Process */}
      <section id="process" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Процесс</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
              Как мы <span className="text-gradient">работаем</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto space-y-0">
            {/* Vertical line connector */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-px bg-border hidden md:block" />

            {[
              { step: '01', title: 'Заявка', text: 'Вы оставляете заявку или связываетесь с нами любым удобным способом. Описываете задачу и ожидания.' },
              { step: '02', title: 'Анализ задачи', text: 'Мы изучаем вашу задачу, оцениваем объём работ, сроки и возможные риски.' },
              { step: '03', title: 'Предложение решения', text: 'Формируем коммерческое предложение с чётким планом действий, стоимостью и сроками.' },
              { step: '04', title: 'Реализация', text: 'Выполняем задачу, держим вас в курсе на каждом этапе. Контролируем качество и сроки.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative flex items-start gap-6 md:gap-8 py-6"
              >
                {/* Step number circle */}
                <div className="relative z-10 shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <span className="text-primary font-black text-sm md:text-lg">{item.step}</span>
                </div>

                {/* Content */}
                <div className="pt-1 md:pt-3">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why trust us */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-bold text-sm uppercase tracking-widest">О компании</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
              Почему нам <span className="text-gradient">доверяют</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              East Meridian — ваша операционная инфраструктура в Китае для бизнеса из России и Казахстана
            </p>
          </motion.div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background rounded-2xl border border-border p-8"
              >
                <r.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Портфолио</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
              Наши <span className="text-gradient">кейсы</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casePlaceholders.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl border border-border p-8 space-y-4"
              >
                <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
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
            Это лишь часть наших проектов. Мы готовы обсудить ваш.
          </p>
        </div>
      </section>

      <FAQSection />

      {/* Contacts */}
      <section id="contacts" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Связь</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
              <span className="text-gradient">Контакты</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Свяжитесь с нами любым удобным способом. Мы отвечаем в течение 2 часов.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact info */}
            <div>
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
                <Button className="rounded-xl bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white font-bold" asChild>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button className="rounded-xl bg-[hsl(200,80%,50%)] hover:bg-[hsl(200,80%,42%)] text-white font-bold" asChild>
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

      <CTASection />
    </>
  );
};

export default Index;
