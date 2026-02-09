import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  gradient?: boolean;
}

const PageHero = ({ title, subtitle, icon: Icon, gradient = true }: PageHeroProps) => {
  return (
    <section className="pt-28 pb-16 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {Icon && (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Icon className="h-8 w-8 text-primary" />
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
            {gradient ? (
              <>
                {title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-gradient">{title.split(' ').slice(-1)}</span>
              </>
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
