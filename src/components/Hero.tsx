import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroGym from '@/assets/hero-gym.jpg';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroGym}
          alt="Fitness Bodystyle Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Yellow accent lines */}
      <div className="absolute left-0 top-1/4 w-1 h-32 bg-primary" />
      <div className="absolute right-0 bottom-1/4 w-1 h-32 bg-primary" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              {language === 'sq' ? 'Që nga 2010' : 'Since 2010'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 leading-none">
            <span className="text-foreground">{t('heroTitle').split(' ').slice(0, -1).join(' ')}</span>
            <span className="text-primary"> {t('heroTitle').split(' ').slice(-1)}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-primary-gym">
              {t('joinNow')}
            </a>
            <a href="#about" className="btn-outline-gym">
              {t('learnMore')}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
