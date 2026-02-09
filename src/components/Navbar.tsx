import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Услуги', href: '#services' },
    { label: 'Преимущества', href: '#advantages' },
    { label: 'Как мы работаем', href: '#process' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,30%,10%)/0.85] backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-black text-white">
          China<span className="text-primary">Trade</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white transition-colors font-medium">
              {link.label}
            </a>
          ))}
          <Button size="sm" className="rounded-lg font-bold">
            Оставить заявку
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[hsl(220,30%,10%)/0.95] backdrop-blur-xl border-b border-white/5 px-4 py-6 space-y-4">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-white/70 hover:text-white transition-colors font-medium">
              {link.label}
            </a>
          ))}
          <Button size="sm" className="w-full rounded-lg font-bold mt-4">
            Оставить заявку
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
