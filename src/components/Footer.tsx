import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { serviceCategories } from '@/data/services';

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,30%,10%)] text-white/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-black text-white mb-3 block">
              China<span className="text-primary">Trade</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Операционная инфраструктура в Китае для бизнеса из России и Казахстана. Решаем задачи «под ключ».
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              {serviceCategories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/services/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Все услуги →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors">Как мы работаем</Link></li>
              <li><Link to="/cases" className="hover:text-white transition-colors">Кейсы</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
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
          <p>© {new Date().getFullYear()} ChinaTrade. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
