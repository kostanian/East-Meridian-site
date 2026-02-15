import { motion } from 'framer-motion';
import { ArrowRight, Building2, Globe, Users, ShieldCheck, Award, MapPin, Phone, Mail, MessageCircle, Send as SendIcon, ClipboardList, Search, Lightbulb, Rocket, BarChart3, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceCategories, additionalServicesNote } from '@/data/services';
import HeroSection from '@/components/HeroSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import LeadForm from '@/components/LeadForm';
import { useState } from 'react';

// About data
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

// Process steps
const processSteps = [
  { icon: ClipboardList, number: '01', title: 'Заявка', description: 'Вы оставляете заявку или связываетесь с нами любым удобным способом. Описываете задачу и ожидания.' },
  { icon: Search, number: '02', title: 'Анализ задачи', description: 'Мы изучаем вашу задачу, оцениваем объём работ, сроки и возможные риски.' },
  { icon: Lightbulb, number: '03', title: 'Предложение решения', description: 'Формируем коммерческое предложение с чётким планом действий, стоимостью и сроками.' },
  { icon: Rocket, number: '04', title: 'Реализация', description: 'Выполняем задачу, держим вас в курсе на каждом этапе. Контролируем качество и сроки.' },
  { icon: BarChart3, number: '05', title: 'Отчётность', description: 'Предоставляем полный отчёт о выполненной работе с документами и рекомендациями.' },
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
  { icon: MapPin, label: 'Офис', value: 'Гуанчжоу, Китай' },
  { icon: Phone, label: 'Телефон', value: '+86 XXX XXXX XXXX' },
  { icon: Mail, label: 'Email', value: 'info@chinatrade.com' },
];

const Index = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

          <div className="space-y-4">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <div
                  onClick={() => setExpandedCategory(expandedCategory === category.slug ? null : category.slug)}
                  className="group cursor-pointer bg-card rounded-2xl border border-border p-6 md:p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-card-foreground">{category.title}</h3>
                        <ArrowRight className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-all ${expandedCategory === category.slug ? 'rotate-90' : ''}`} />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{category.description}</p>
                    </div>
                  </div>

                  {/* Expanded services */}
                  {expandedCategory === category.slug && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-border"
                    >
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{category.heroDescription}</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.services.map((service) => (
                          <div key={service.title} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                            <service.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-bold text-foreground mb-1">{service.title}</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {category.slug === 'additional' && (
                        <p className="text-muted-foreground text-sm mt-4 italic">{additionalServicesNote}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvantagesSection />
      <HowItWorksSection />

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
              ChinaTrade — ваша операционная инфраструктура в Китае для бизнеса из России и Казахстана
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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

          <div className="max-w-4xl mx-auto space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {index < processSteps.length - 1 && (
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

      <CTASection />
    </>
  );
};

export default Index;
