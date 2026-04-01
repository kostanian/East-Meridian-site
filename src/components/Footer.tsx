import { MapPin, Phone, Mail, Send } from 'lucide-react';
import TelegramIcon from '@/components/icons/TelegramIcon';
import WeChatIcon from '@/components/icons/WeChatIcon';
import { serviceCategories } from '@/data/services';

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(215,30%,10%)] text-white/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-2xl font-black text-white mb-3 block tracking-wide"
            >
              EAST<span className="text-primary"> MERIDIAN</span>
            </a>
            <p className="text-sm leading-relaxed mb-4">
              Операционная инфраструктура в Китае для бизнеса из России и Казахстана. Решаем задачи «под ключ».
            </p>
            <div className="flex gap-3">
              <a href="https://t.me/east_meridian" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <TelegramIcon className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm mt-3">WeChat: east_meridian</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              {serviceCategories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors text-left">
                    {cat.shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollTo('#about')} className="hover:text-white transition-colors">О компании</button></li>
              <li><button onClick={() => scrollTo('#advantages')} className="hover:text-white transition-colors">Преимущества</button></li>
              <li><button onClick={() => scrollTo('#cases')} className="hover:text-white transition-colors">Кейсы</button></li>
              <li><button onClick={() => scrollTo('#contacts')} className="hover:text-white transition-colors">Контакты</button></li>
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
                +86 132 2205 0 892
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                info@eastmeridian.com
              </li>
              <li className="flex items-center gap-2">
                <Send className="h-4 w-4 text-primary shrink-0" />
                <a href="https://t.me/east_meridian" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram: @east_meridian</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                WeChat: east_meridian
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} East Meridian. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
