import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react';
import gymExterior from '@/assets/gym-exterior.jpg';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      label: t('address'),
      value: 'Shkodër, Albania',
      link: 'https://maps.google.com/?q=Shkoder,Albania',
    },
    {
      icon: Clock,
      label: t('hours'),
      value: `${t('weekdays')}: 06:00 - 22:00\n${t('sunday')}: ${t('closed')}`,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-sm mb-6">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              {t('contactTitle')}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('contactSubtitle')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image & Map Link */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={gymExterior}
                alt="Fitness Bodystyle Exterior"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Shkoder,Albania"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-gym mt-6 inline-flex items-center gap-2 w-full justify-center"
            >
              <MapPin className="w-5 h-5" />
              {t('getDirections')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="gym-card flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-xl text-foreground mb-1">
                    {info.label}
                  </h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Instagram */}
            <a
              href="https://www.instagram.com/fitnessbodystyle_/"
              target="_blank"
              rel="noopener noreferrer"
              className="gym-card flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-xl text-foreground mb-1">
                  {t('followUs')}
                </h4>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">
                  @fitnessbodystyle_
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/fitness.bodystyle/"
              target="_blank"
              rel="noopener noreferrer"
              className="gym-card flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-[#1877F2] rounded-lg flex items-center justify-center flex-shrink-0">
                <Facebook className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-xl text-foreground mb-1">
                  {t('followFacebook')}
                </h4>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">
                  Fitness Bodystyle
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
