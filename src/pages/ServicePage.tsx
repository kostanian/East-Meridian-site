import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { serviceCategories, additionalServicesNote } from '@/data/services';
import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import CTASection from '@/components/CTASection';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = serviceCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="pt-28 pb-24 text-center">
        <h1 className="text-3xl font-black text-foreground">Услуга не найдена</h1>
        <Link to="/services" className="text-primary mt-4 inline-block hover:underline">
          Вернуться к списку услуг
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={category.title}
        subtitle={category.heroDescription}
        icon={category.icon}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {category.slug === 'additional' && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto italic"
            >
              {additionalServicesNote}
            </motion.p>
          )}
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-foreground mb-8">Другие услуги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories
              .filter((c) => c.slug !== slug)
              .slice(0, 6)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/services/${c.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <c.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-semibold text-foreground text-sm">{c.shortTitle}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <LeadForm
            title="Запросить расчёт"
            subtitle={`Расскажите о вашей задаче — мы подготовим предложение по услуге "${category.shortTitle}"`}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ServicePage;
