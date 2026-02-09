import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-logistics.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Контейнерный порт в Китае" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,40%,8%)/0.92] via-[hsl(220,40%,8%)/0.75] to-[hsl(220,40%,8%)/0.5]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-6">
              🇨🇳 Ваш операционный партнёр в Китае
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6"
          >
            Бизнес-услуги
            <br />
            <span className="text-gradient">в Китае «под ключ»</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
          >
            Закупки, логистика, фулфилмент, финансы, юридическая поддержка и многое другое — 
            для бизнеса из России и Казахстана.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contacts">
              <Button size="lg" className="text-base px-8 py-6 rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl font-bold border-white/20 text-white hover:bg-white/10 hover:text-white">
                Наши услуги
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-lg"
          >
            {[
              { value: '8+', label: 'Лет опыта' },
              { value: '5000+', label: 'Доставок' },
              { value: '99%', label: 'Довольных клиентов' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
