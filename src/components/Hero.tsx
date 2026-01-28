import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Target, ChevronRight } from 'lucide-react';
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
        {/* Multi-layer overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary/30 rounded-br-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary/30 rounded-tl-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="space-y-8 animate-fade-in py-20">
          {/* Main Title - Split design */}
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-4">
              <span className="block text-foreground">
                {t('heroTitle').split(' ').slice(0, -1).join(' ')}
              </span>
              <span className="block text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text">
                {t('heroTitle').split(' ').slice(-1)}
              </span>
            </h1>
          </div>

          {/* Subtitle with stats integration */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Mini stats row */}
          <div className="flex justify-center gap-6 md:gap-10 flex-wrap my-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground">Established</div>
                <div className="font-bold text-foreground text-lg">2009</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground">Active Members</div>
                <div className="font-bold text-foreground text-lg">500+</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Minimalist Card Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 max-w-xl mx-auto">
            {/* Card 1: Get Started */}
            <a 
              href="#contact"
              className="group relative"
            >
              <div className="p-5 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-foreground">{t('joinNow')}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{language === 'sq' ? 'Filloni udhëtimin' : 'Start your journey'}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </a>

            {/* Card 2: Learn More */}
            <a 
              href="/about"
              className="group relative"
            >
              <div className="p-5 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-foreground">{t('learnMore')}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{language === 'sq' ? 'Për më shumë informacion' : 'Learn more about us'}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
