import {
  Search, ShoppingCart, Store, Handshake,
  CreditCard, Wallet, FileSpreadsheet,
  ShieldCheck, Scale, ClipboardCheck, ScanEye,
  Ship, Train, Globe, Calculator, MapPin,
  Warehouse, PackageCheck, Truck, Send,
  Package, Tag, Box, Scissors, Hammer,
  Route, Navigation,
  Users as UsersIcon, Weight, Forklift,
  Languages, MessageSquare, UserCheck, BookOpen,
  Award, Factory, TrendingUp, UserSearch, Building2, Wrench,
  LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroDescription: string;
  icon: LucideIcon;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'procurement',
    title: 'Закупки в Китае',
    shortTitle: 'Закупки',
    description: 'Поиск товаров и поставщиков, выкуп с площадок, работа с Taobao, 1688, Alibaba.',
    heroDescription: 'Полный цикл закупок: поиск товаров и поставщиков, выкуп с площадок, работа с Taobao, 1688, Alibaba и переговоры с фабриками.',
    icon: ShoppingCart,
    services: [
      { icon: Search, title: 'Поиск товаров и поставщиков', description: 'Подбор надёжных производителей и поставщиков по вашим требованиям к качеству и цене.' },
      { icon: ShoppingCart, title: 'Выкуп товаров', description: 'Оперативный выкуп товаров с площадок и напрямую у поставщиков с проверкой качества.' },
      { icon: Store, title: 'Работа с Taobao, 1688, Alibaba', description: 'Профессиональная работа с крупнейшими китайскими торговыми площадками.' },
      { icon: Handshake, title: 'Переговоры с фабриками', description: 'Ведение переговоров на китайском языке, согласование условий, скидок и сроков.' },
    ],
  },
  {
    slug: 'support',
    title: 'Переводы и сопровождение',
    shortTitle: 'Сопровождение',
    description: 'Устный и письменный перевод, сопровождение на фабриках, выставках и переговорах.',
    heroDescription: 'Профессиональные переводческие услуги и личное сопровождение при работе в Китае: фабрики, выставки, деловые встречи.',
    icon: Languages,
    services: [
      { icon: BookOpen, title: 'Письменный и устный перевод', description: 'Перевод документов, договоров, синхронный перевод на переговорах и встречах.' },
      { icon: UserCheck, title: 'Сопровождение переводчика', description: 'Переводчик сопровождает вас при посещении фабрик, выставок и офисов.' },
      { icon: Languages, title: 'Деловой перевод', description: 'Перевод переписки, контрактов и технической документации.' },
      { icon: MessageSquare, title: 'Коммуникация с поставщиками', description: 'Ведение переписки и переговоров с китайскими партнёрами от вашего имени.' },
    ],
  },
  {
    slug: 'finance-legal',
    title: 'Финансы и юридические услуги',
    shortTitle: 'Финансы и право',
    description: 'Безопасные переводы, оплата поставщикам, регистрация торговых марок и проверка контрагентов.',
    heroDescription: 'Легальные переводы через WeChat Pay, Alipay и банковские счета. Регистрация торговых марок, аудит фабрик и проверка контрагентов.',
    icon: CreditCard,
    services: [
      { icon: Wallet, title: 'Переводы (WeChat Pay, Alipay)', description: 'Быстрые переводы через популярные китайские платёжные системы.' },
      { icon: CreditCard, title: 'Оплата поставщикам', description: 'Безопасная оплата напрямую поставщикам с подтверждением получения средств.' },
      { icon: FileSpreadsheet, title: 'Сопровождение расчётов', description: 'Полный пакет закрывающих документов, контроль курса и комиссий.' },
      { icon: Scale, title: 'Регистрация торговых марок', description: 'Полное сопровождение регистрации вашего бренда в Китае.' },
      { icon: ClipboardCheck, title: 'Проверка контрагентов', description: 'Верификация лицензий, финансового состояния и репутации китайских компаний.' },
      { icon: ScanEye, title: 'Аудит фабрик и инспекция товара', description: 'Выездная проверка производства и качества товаров перед отправкой.' },
    ],
  },
  {
    slug: 'logistics',
    title: 'Логистика и перевозки',
    shortTitle: 'Логистика',
    description: 'Морские, ж/д, мультимодальные и внутренние перевозки по Китаю с оптимизацией маршрутов.',
    heroDescription: 'Организация перевозок любым видом транспорта: морские, железнодорожные, мультимодальные. Внутренняя доставка по Китаю и сопровождение грузов.',
    icon: Ship,
    services: [
      { icon: Ship, title: 'Морские перевозки', description: 'Доставка контейнеров морским транспортом через крупнейшие порты Китая.' },
      { icon: Train, title: 'Железнодорожные перевозки', description: 'Контейнерные перевозки по ж/д маршрутам Китай — Россия / страны СНГ.' },
      { icon: Globe, title: 'Мультимодальная доставка', description: 'Комбинированная логистика с использованием нескольких видов транспорта.' },
      { icon: Truck, title: 'Внутренняя перевозка по Китаю', description: 'Быстрая доставка грузов между городами Китая.' },
      { icon: Route, title: 'Подбор маршрутов и оптимизация', description: 'Выбор оптимальных маршрутов для снижения стоимости и времени доставки.' },
      { icon: MapPin, title: 'Сопровождение грузов', description: 'Отслеживание и контроль на каждом этапе транспортировки.' },
    ],
  },
  {
    slug: 'warehouse-packaging',
    title: 'Склад, упаковка и погрузка',
    shortTitle: 'Склад и упаковка',
    description: 'Складские услуги, консолидация, упаковка для логистики и маркетплейсов, маркировка и погрузка.',
    heroDescription: 'Полный цикл складских и погрузочных услуг: аренда склада, консолидация, фулфилмент, упаковка, маркировка, обрешётка и погрузка контейнеров.',
    icon: Warehouse,
    services: [
      { icon: Warehouse, title: 'Аренда складского пространства', description: 'Гибкая аренда складских площадей в Гуанчжоу и Иу.' },
      { icon: PackageCheck, title: 'Консолидация грузов', description: 'Сбор товаров от разных поставщиков на одном складе для совместной отправки.' },
      { icon: Package, title: 'Фулфилмент услуги', description: 'Приёмка, хранение, комплектация заказов и отправка конечному покупателю.' },
      { icon: Package, title: 'Упаковка под логистику', description: 'Надёжная упаковка для безопасной международной транспортировки.' },
      { icon: Tag, title: 'Упаковка для маркетплейсов', description: 'Подготовка товаров по стандартам Amazon, Wildberries, Ozon и других площадок.' },
      { icon: Tag, title: 'Маркировка', description: 'Нанесение штрих-кодов, этикеток и маркировки по требованиям.' },
      { icon: Scissors, title: 'Прессование одежды', description: 'Вакуумное прессование одежды для экономии объёма при транспортировке.' },
      { icon: Hammer, title: 'Обрешётка и конструкции', description: 'Фанерные щиты, сварные конструкции и обрешётка для крупногабаритных грузов.' },
      { icon: UsersIcon, title: 'Услуги грузчиков', description: 'Бригады опытных грузчиков для работы на складе и при отправке.' },
      { icon: Forklift, title: 'Погрузка и спецтехника', description: 'Загрузка контейнеров, вилочные погрузчики и другая техника.' },
    ],
  },
  {
    slug: 'additional',
    title: 'Дополнительные услуги',
    shortTitle: 'Дополнительно',
    description: 'Сопровождение на выставках, private label, представительство в Китае и многое другое.',
    heroDescription: 'Расширенный спектр услуг: сопровождение на выставках, запуск private label, представительство в Китае и индивидуальные проекты.',
    icon: Wrench,
    services: [
      { icon: Award, title: 'Сопровождение на выставках', description: 'Canton Fair и другие выставки — организация визита, переводчик, помощь в переговорах.' },
      { icon: Factory, title: 'Поиск производителей под private label', description: 'Подберём фабрику для производства товаров под вашим брендом.' },
      { icon: TrendingUp, title: 'Запуск продаж в Китае', description: 'Помощь в выходе на китайский рынок: маркетплейсы, дистрибуция, маркетинг.' },
      { icon: Building2, title: 'Представительство в Китае', description: 'Выступаем как ваш офис в Китае — решаем задачи на месте.' },
      { icon: Wrench, title: 'Решение нестандартных задач', description: 'Любые бизнес-задачи в Китае — мы найдём решение.' },
    ],
  },
];
export const additionalServicesNote = 'Перечень услуг не ограничивается указанными. По запросу клиента мы можем организовать и реализовать индивидуальные проекты и задачи любой сложности в Китае.';
