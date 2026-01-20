import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Dumbbell, UserCheck, Users } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Heart,
      title: t('cardio'),
      description: t('cardioDesc'),
    },
    {
      icon: Dumbbell,
      title: t('strength'),
      description: t('strengthDesc'),
    },
    {
      icon: UserCheck,
      title: t('personal'),
      description: t('personalDesc'),
    },
    {
      icon: Users,
      title: t('groupFitness'),
      description: t('groupFitnessDesc'),
    },
  ];

  return (
    <section id="services" className="section-padding bg-secondary relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--primary)) 35px, hsl(var(--primary)) 36px)`
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-sm mb-6">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              {t('servicesTitle')}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('servicesSubtitle')}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="gym-card group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
