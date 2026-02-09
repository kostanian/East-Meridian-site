import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { serviceCategories, additionalServicesNote } from '@/data/services';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

const Services = () => {
  return (
    <>
      <PageHero
        title="Наши услуги"
        subtitle="Полный спектр бизнес-услуг для работы с Китаем — от поиска товара до доставки к вашей двери"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/services/${category.slug}`}
                  className="group block bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-card-foreground">{category.title}</h2>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.services.slice(0, 4).map((s) => (
                          <span
                            key={s.title}
                            className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                          >
                            {s.title}
                          </span>
                        ))}
                        {category.services.length > 4 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            +{category.services.length - 4} ещё
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto italic"
          >
            {additionalServicesNote}
          </motion.p>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Services;
