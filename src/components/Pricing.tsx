import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, User } from 'lucide-react';

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male');

  const malePricing = [
    { duration: '1', months: t('month'), price: '3,500', perMonth: '3,500' },
    { duration: '3', months: t('months'), price: '9,000', perMonth: '3,000', popular: false },
    { duration: '6', months: t('months'), price: '18,000', perMonth: '3,000', popular: true },
    { duration: '12', months: t('months'), price: '36,000', perMonth: '3,000' },
  ];

  const femalePricing = [
    { duration: '1', months: t('month'), price: '3,000', perMonth: '3,000' },
    { duration: '3', months: t('months'), price: '7,500', perMonth: '2,500', popular: false },
    { duration: '6', months: t('months'), price: '15,000', perMonth: '2,500', popular: true },
    { duration: '12', months: t('months'), price: '30,000', perMonth: '2,500' },
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
              {t('pricingTitle')}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('pricingSubtitle')}
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
              {t('male')}
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
              {t('female')}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricing.map((plan, index) => (
            <div
              key={index}
              className={`gym-card relative ${
                plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    {t('popular')}
                  </span>
                </div>
              )}
              
              <div className="text-center pt-4">
                <div className="font-display text-5xl text-primary mb-2">
                  {plan.duration}
                </div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm mb-6">
                  {plan.months}
                </div>
                
                <div className="border-t border-border pt-6 pb-4">
                  <div className="font-display text-3xl text-foreground mb-1">
                    {plan.price} <span className="text-lg">ALL</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {plan.perMonth} ALL / {t('month')}
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`btn-primary-gym w-full mt-4 inline-block text-center ${
                    plan.popular ? '' : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {t('selectPlan')}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground mt-8 text-sm">
          {t('pricingNote')}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
