import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Услуги', href: '#services' },
    { label: 'О компании', href: '#about' },
    { label: 'Преимущества', href: '#advantages' },
    { label: 'Кейсы', href: '#cases' },
    { label: 'Блог', href: 'https://blog.east-meridian.com', external: true },
    { label: 'Контакты', href: '#contacts' },
  ];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[hsl(215,30%,8%)] shadow-lg shadow-black/20'
        : 'bg-[hsl(215,30%,10%)]/85 backdrop-blur-xl'
    } border-b border-white/5`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xl font-black text-white tracking-wide"
        >
          EAST<span className="text-primary"> MERIDIAN</span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            'external' in link && link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            )
          ))}
          <Button size="sm" className="rounded-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollTo('#contacts')}>
            Оставить заявку
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[hsl(215,30%,8%)] border-b border-white/5 px-4 py-6 space-y-2">
          {links.map((link) => (
            'external' in link && link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left py-2 text-white/80 hover:text-white font-medium"
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-2 text-white/80 hover:text-white font-medium"
              >
                {link.label}
              </button>
            )
          ))}
          <Button size="sm" className="w-full rounded-lg font-bold mt-4" onClick={() => scrollTo('#contacts')}>
            Оставить заявку
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
