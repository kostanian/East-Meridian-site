import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-logistics.webp';

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Контейнерный порт в Китае" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,40%,4%)]/75 via-[hsl(220,40%,4%)]/55 to-[hsl(220,40%,4%)]/30" />
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
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg"
          >
            Бизнес-услуги
            <br />
            <span className="text-gradient">в Китае «под ключ»</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/85 mb-10 max-w-xl leading-relaxed drop-shadow-md"
          >
            Полный спектр услуг в Китае для бизнеса и физических лиц из России и стран СНГ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="text-base px-8 py-6 rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
              onClick={() => scrollTo('#contacts')}
            >
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="text-base px-8 py-6 rounded-xl font-bold bg-white text-foreground hover:bg-white/90 shadow-lg"
              onClick={() => scrollTo('#services')}
            >
              Наши услуги
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
