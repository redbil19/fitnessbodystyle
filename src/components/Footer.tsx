import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-primary">FITNESS</span>
            <span className="font-display text-2xl text-foreground">BODYSTYLE</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/fitnessbodystyle_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary group transition-colors duration-300"
            >
              <Instagram className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </a>
            <a
              href="https://maps.app.goo.gl/6jLYRcFuJLHBg32GA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary group transition-colors duration-300"
            >
              <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2009 - {new Date().getFullYear()} Fitness Bodystyle. {t('footerText')}.
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </footer>
  );
};

export default Footer;
