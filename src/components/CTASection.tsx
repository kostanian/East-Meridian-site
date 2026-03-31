import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,75%,45%)] to-[hsl(215,65%,30%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzBoLTRWMjBoNHYtNmg2djZoNHYxMGgtNHY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Готовы начать работу с Китаем?
          </h2>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">
            Оставьте заявку и получите бесплатный расчёт стоимости 
            или консультацию по любой из наших услуг
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6 rounded-xl font-bold shadow-lg"
              onClick={() => document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Оставить заявку
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 rounded-xl font-bold" asChild>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 rounded-xl font-bold" asChild>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-5 w-5" />
                Telegram
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
