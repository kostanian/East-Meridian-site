import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/data/services';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Услуги', href: '/services', hasDropdown: true },
    { label: 'О компании', href: '/about' },
    { label: 'Как мы работаем', href: '/process' },
    { label: 'Кейсы', href: '/cases' },
    { label: 'Контакты', href: '/contacts' },
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,30%,10%)/0.85] backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-black text-white">
          China<span className="text-primary">Trade</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                to={link.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive(link.href) ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="h-3 w-3" />}
              </Link>

              {/* Services dropdown */}
              {link.hasDropdown && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-[hsl(220,30%,12%)] border border-white/10 rounded-xl shadow-2xl p-3 min-w-[280px] space-y-1">
                    {serviceCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/services/${cat.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <cat.icon className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{cat.shortTitle}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/contacts">
            <Button size="sm" className="rounded-lg font-bold">
              Оставить заявку
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[hsl(220,30%,10%)/0.95] backdrop-blur-xl border-b border-white/5 px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
          {links.map((link) => (
            <div key={link.href}>
              {link.hasDropdown ? (
                <>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center justify-between w-full py-2 text-white/70 hover:text-white font-medium"
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="pl-4 space-y-1 mb-2">
                      <Link
                        to="/services"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-sm text-white/60 hover:text-white"
                      >
                        Все услуги
                      </Link>
                      {serviceCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/services/${cat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 py-2 text-sm text-white/60 hover:text-white"
                        >
                          <cat.icon className="h-4 w-4 text-primary" />
                          {cat.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-white/70 hover:text-white font-medium"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <Link to="/contacts" onClick={() => setIsOpen(false)}>
            <Button size="sm" className="w-full rounded-lg font-bold mt-4">
              Оставить заявку
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
