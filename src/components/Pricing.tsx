import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, User, Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male');

  const translations = {
    sq: {
      membership: "ABONIM",
      title: "Zgjedh planin e duhur për arritjen e qëllimeve tuaja",
      male: "Meshkuj",
      female: "Femra",
      lek: "ALL",
      month: "muaj",
      daily: "Ditor",
      twiceWeek: "2x javë",
      thriceWeek: "3x javë",
      daily_full: "Çdo ditë",
      info: "Informacion i Përgjithshëm",
      hours: "Orari i Punës",
      hoursText: "E hënë - E shtunë: 08:00 – 22:00",
      rest: "Pushim",
      restText: "E diela: Pushim",
      flexible: "Fleksibilitet",
      flexibleText: "Rrit ose zvogëlo frekuencën tuaj në çdo kohë",
      selectPlan: "Zgjedh Planin",
    },
    en: {
      membership: "MEMBERSHIP",
      title: "Choose the right plan to achieve your goals",
      male: "Men",
      female: "Women",
      lek: "ALL",
      month: "month",
      daily: "Daily",
      twiceWeek: "2x per week",
      thriceWeek: "3x per week",
      daily_full: "Every day",
      info: "General Information",
      hours: "Working Hours",
      hoursText: "Monday - Saturday: 08:00 – 22:00",
      rest: "Rest Day",
      restText: "Sunday: Closed",
      flexible: "Flexibility",
      flexibleText: "Increase or decrease your frequency anytime",
      selectPlan: "Choose Plan",
    }
  }

  const t = translations[language as keyof typeof translations];

  const malePricing = [
    { name: t.daily, price: 500, duration: "1 " + t.month },
    { name: t.twiceWeek, price: 2500, duration: "1 " + t.month },
    { name: t.thriceWeek, price: 3000, duration: "1 " + t.month },
    { name: t.daily_full, price: 3500, duration: "1 " + t.month },
    { name: t.daily_full, price: 9000, duration: "3 " + t.month },
    { name: t.daily_full, price: 18000, duration: "6 " + t.month },
    { name: t.daily_full, price: 36000, duration: "1 year" },
  ];

  const femalePricing = [
    { name: t.daily, price: 500, duration: "1 " + t.month },
    { name: t.twiceWeek, price: 2000, duration: "1 " + t.month },
    { name: t.thriceWeek, price: 2500, duration: "1 " + t.month },
    { name: t.daily_full, price: 3000, duration: "1 " + t.month },
    { name: t.daily_full, price: 7500, duration: "3 " + t.month },
    { name: t.daily_full, price: 15000, duration: "6 " + t.month },
    { name: t.daily_full, price: 30000, duration: "1 year" },
  ];

  const pricing = activeTab === 'male' ? malePricing : femalePricing;

  return (
    <section id="pricing" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-sm mb-6">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              {t.membership}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t.title}
          </h2>
        </div>

        {/* Gender Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-secondary p-2 rounded-lg flex gap-2">
            <button
              onClick={() => setActiveTab('male')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-display text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'male'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-5 h-5" />
              {t.male}
            </button>
            <button
              onClick={() => setActiveTab('female')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-display text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'female'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="w-5 h-5" />
              {t.female}
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricing.map((plan, index) => (
            <div
              key={index}
              className="gym-card hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.duration}</p>
                
                <div className="border-t border-border pt-4 pb-6">
                  <div className="font-display text-3xl text-foreground mb-1">
                    {plan.price}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {t.lek}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="btn-primary-gym w-full inline-block text-center text-sm"
                >
                  {t.selectPlan}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">{t.info}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <Check className="w-8 h-8 text-primary mb-3" />
              <p className="font-semibold text-foreground mb-1">{t.hours}</p>
              <p className="text-muted-foreground text-sm">{t.hoursText}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Check className="w-8 h-8 text-primary mb-3" />
              <p className="font-semibold text-foreground mb-1">{t.rest}</p>
              <p className="text-muted-foreground text-sm">{t.restText}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Check className="w-8 h-8 text-primary mb-3" />
              <p className="font-semibold text-foreground mb-1">{t.flexible}</p>
              <p className="text-muted-foreground text-sm">{t.flexibleText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
