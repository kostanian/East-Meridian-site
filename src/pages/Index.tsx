import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/data/services';
import HeroSection from '@/components/HeroSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import LeadForm from '@/components/LeadForm';

const Index = () => {
  return (
    <>
      <HeroSection />

      {/* Services overview */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Что мы предлагаем</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 text-foreground">
              Наши <span className="text-gradient">услуги</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Полный спектр бизнес-услуг для работы с Китаем — от поиска товара до доставки к вашей двери
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.slice(0, 6).map((cat, index) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={`/services/${cat.slug}`}
                  className="group block bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{cat.shortTitle}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cat.description}</p>
                  <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg" className="rounded-xl font-bold">
                Все услуги
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AdvantagesSection />
      <HowItWorksSection />
      <FAQSection />

      {/* Lead form section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <LeadForm />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Index;
