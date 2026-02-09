import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,30%,10%)] text-white/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-3">
              China<span className="text-primary">Trade</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Комплексные бизнес-услуги для работы с Китаем. Доставка, фулфилмент, юридическая поддержка.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Доставка грузов</li>
              <li className="hover:text-white transition-colors cursor-pointer">Склад и фулфилмент</li>
              <li className="hover:text-white transition-colors cursor-pointer">Регистрация торговой марки</li>
              <li className="hover:text-white transition-colors cursor-pointer">Проверка контрагентов</li>
              <li className="hover:text-white transition-colors cursor-pointer">Оплата поставщику</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">О нас</li>
              <li className="hover:text-white transition-colors cursor-pointer">Как мы работаем</li>
              <li className="hover:text-white transition-colors cursor-pointer">Отзывы клиентов</li>
              <li className="hover:text-white transition-colors cursor-pointer">Блог</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-white mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Гуанчжоу, Китай
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                +86 XXX XXXX XXXX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                info@chinatrade.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          <p>© 2025 ChinaTrade. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
