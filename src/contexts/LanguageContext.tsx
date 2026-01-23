import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sq' | 'en';

interface Translations {
  [key: string]: {
    sq: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { sq: 'Kryesore', en: 'Home' },
  about: { sq: 'Rreth Nesh', en: 'About' },
  services: { sq: 'Shërbimet', en: 'Services' },
  gallery: { sq: 'Galeria', en: 'Gallery' },
  contact: { sq: 'Kontakt', en: 'Contact' },
  
  // Hero
  heroTitle: { sq: 'TRANSFORMO TRUPIN TËND', en: 'TRANSFORM YOUR BODY' },
  heroSubtitle: { sq: 'Që nga viti 2010, ne kemi ndihmuar mijëra njerëz të arrijnë qëllimet e tyre të fitnesit', en: 'Since 2010, we have helped thousands of people achieve their fitness goals' },
  joinNow: { sq: 'BASHKOHU TANI', en: 'JOIN NOW' },
  learnMore: { sq: 'MËSO MË SHUMË', en: 'LEARN MORE' },
  
  // About
  aboutTitle: { sq: 'RRETH NESH', en: 'ABOUT US' },
  aboutSubtitle: { sq: 'Më shumë se 14 vite eksperiencë në industrinë e fitnesit', en: 'More than 14 years of experience in the fitness industry' },
  aboutDescription: { sq: 'Fitness Bodystyle është një palestër moderne e themeluar në vitin 2010, e pajisur me pajisjet më të mira të fitnesit. Ne ofrojmë një ambient profesional dhe motivues ku çdo anëtar mund të arrij potencialin e tij maksimal.', en: 'Fitness Bodystyle is a modern gym founded in 2010, equipped with the best fitness equipment. We offer a professional and motivating environment where every member can reach their maximum potential.' },
  yearsExperience: { sq: 'Vite Eksperiencë', en: 'Years Experience' },
  happyMembers: { sq: 'Anëtarë të Kënaqur', en: 'Happy Members' },
  equipment: { sq: 'Pajisje Moderne', en: 'Modern Equipment' },
  
  // Services
  servicesTitle: { sq: 'SHËRBIMET TONA', en: 'OUR SERVICES' },
  servicesSubtitle: { sq: 'Gjithçka që ju nevojitet për të arritur qëllimet tuaja', en: 'Everything you need to achieve your goals' },
  cardio: { sq: 'Kardio', en: 'Cardio' },
  cardioDesc: { sq: 'Pajisje moderne kardio për djegie maksimale të kalorive', en: 'Modern cardio equipment for maximum calorie burn' },
  strength: { sq: 'Forca', en: 'Strength' },
  strengthDesc: { sq: 'Zona e plotë e peshave për ndërtimin e muskujve', en: 'Complete weight area for muscle building' },
  personal: { sq: 'Trajner Personal', en: 'Personal Training' },
  personalDesc: { sq: 'Trajnerë të certifikuar për udhëzime individuale', en: 'Certified trainers for individual guidance' },
  groupFitness: { sq: 'Fitness Grupor', en: 'Group Fitness' },
  groupFitnessDesc: { sq: 'Klasa dinamike për motivim shtesë', en: 'Dynamic classes for extra motivation' },
  
  // Gallery
  galleryTitle: { sq: 'GALERIA', en: 'GALLERY' },
  gallerySubtitle: { sq: 'Shihni ambientet tona moderne', en: 'See our modern facilities' },
  
  // Contact
  contactTitle: { sq: 'NA KONTAKTONI', en: 'CONTACT US' },
  contactSubtitle: { sq: 'Jemi këtu për të ju ndihmuar', en: 'We are here to help you' },
  address: { sq: 'Adresa', en: 'Address' },
  phone: { sq: 'Telefon', en: 'Phone' },
  email: { sq: 'Email', en: 'Email' },
  hours: { sq: 'Orari', en: 'Hours' },
  weekdays: { sq: 'E Hënë - E Shtunë', en: 'Monday - Saturday' },
  sunday: { sq: 'E Dielë', en: 'Sunday' },
  closed: { sq: 'Mbyllur', en: 'Closed' },
  getDirections: { sq: 'MERR DREJTIMET', en: 'GET DIRECTIONS' },
  followUs: { sq: 'Na ndiqni në Instagram', en: 'Follow us on Instagram' },
  followFacebook: { sq: 'Na ndiqni në Facebook', en: 'Follow us on Facebook' },
  
  // Pricing
  pricingTitle: { sq: 'ÇMIMET', en: 'PRICING' },
  pricingSubtitle: { sq: 'Zgjidhni planin tuaj', en: 'Choose your plan' },
  male: { sq: 'Meshkuj', en: 'Male' },
  female: { sq: 'Femra', en: 'Female' },
  month: { sq: 'Muaj', en: 'Month' },
  months: { sq: 'Muaj', en: 'Months' },
  popular: { sq: 'Më Popullorë', en: 'Most Popular' },
  selectPlan: { sq: 'ZGJIDH PLANIN', en: 'SELECT PLAN' },
  pricingNote: { sq: 'Çmimet janë në Lekë Shqiptare (ALL). Kontaktoni për më shumë informacion.', en: 'Prices are in Albanian Lek (ALL). Contact us for more information.' },
  
  // CTA
  ctaTitle: { sq: 'FILLONI SOTT TRANSFORMIMIN TUAJ', en: 'START YOUR TRANSFORMATION TODAY' },
  ctaSubtitle: { sq: 'Bashkohuni me familjen tonë të fitnesit dhe arrini qëllimet tuaja', en: 'Join our fitness family and achieve your goals' },
  
  // Footer
  footerText: { sq: 'Të gjitha të drejtat e rezervuara', en: 'All rights reserved' },
  workHard: { sq: 'PUNO FORT DHE JI KRENAR PËR ATË QË ARRIN', en: 'WORK HARD AND BE PROUD OF WHAT YOU ACHIEVE' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sq');

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
