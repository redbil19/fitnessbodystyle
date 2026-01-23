import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function PricingPlans() {
  const { language } = useLanguage()

  const translations = {
    sq: {
      title: "ABONIM",
      subtitle: "Zgjedh planin e duhur për arritjen e qëllimeve tuaja",
      maleTitle: "FITNESS BODYSTYLE",
      maleSubtitle: "Abonim për Meshkuj",
      femaleTitle: "FITNESS BODYSTYLE",
      femaleSubtitle: "Abonim për Femra",
      infoTitle: "Informacion i Përgjithshëm",
      hours: "Orari i Punës",
      hoursText: "E hënë - E shtunë: 08:00 – 22:00",
      rest: "Pushim",
      restText: "E diela: Pushim",
      flexible: "Fleksibilitet",
      flexibleText: "Rrit ose zvogëlo frekuencën tuaj në çdo kohë",
      lek: "Lek",
      daily: "Ditor",
      twice: "2x javë",
      thrice: "3x javë",
      daily_full: "Çdo ditë",
      month: "1 muaj",
      months3: "3 muaj",
      months6: "6 muaj",
      year: "1 vit",
    },
    en: {
      title: "MEMBERSHIP",
      subtitle: "Choose the right plan to achieve your goals",
      maleTitle: "FITNESS BODYSTYLE",
      maleSubtitle: "Membership for Men",
      femaleTitle: "FITNESS BODYSTYLE",
      femaleSubtitle: "Membership for Women",
      infoTitle: "General Information",
      hours: "Working Hours",
      hoursText: "Monday - Saturday: 08:00 – 22:00",
      rest: "Rest Day",
      restText: "Sunday: Closed",
      flexible: "Flexibility",
      flexibleText: "Increase or decrease your frequency anytime",
      lek: "Lek",
      daily: "Daily",
      twice: "2x per week",
      thrice: "3x per week",
      daily_full: "Every day",
      month: "1 month",
      months3: "3 months",
      months6: "6 months",
      year: "1 year",
    }
  }

  const t = translations[language as keyof typeof translations]

  const maleData = {
    plans: [
      { duration: t.daily, price: 500 },
      { duration: t.twice, price: 2500, label: t.month },
      { duration: t.thrice, price: 3000, label: t.month },
      { duration: t.daily_full, price: 3500, label: t.month },
      { duration: t.daily_full, price: 9000, label: t.months3 },
      { duration: t.daily_full, price: 18000, label: t.months6 },
      { duration: t.daily_full, price: 36000, label: t.year },
    ]
  }

  const femaleData = {
    plans: [
      { duration: t.daily, price: 500 },
      { duration: t.twice, price: 2000, label: t.month },
      { duration: t.thrice, price: 2500, label: t.month },
      { duration: t.daily_full, price: 3000, label: t.month },
      { duration: t.daily_full, price: 7500, label: t.months3 },
      { duration: t.daily_full, price: 15000, label: t.months6 },
      { duration: t.daily_full, price: 30000, label: t.year },
    ]
  }

  const PricingCard = ({ data, isMale }: { data: typeof maleData, isMale: boolean }) => (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/70 p-8 text-center">
        <h3 className="text-2xl font-bold text-background mb-2">
          {isMale ? t.maleTitle : t.femaleTitle}
        </h3>
        <p className="text-background/90 font-semibold">
          {isMale ? t.maleSubtitle : t.femaleSubtitle}
        </p>
      </div>

      {/* Plans */}
      <div className="p-8 space-y-4">
        {data.plans.map((plan, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-primary/10 transition-colors">
            <div className="flex-1">
              <p className="font-semibold text-foreground">{plan.duration}</p>
              {plan.label && <p className="text-sm text-muted-foreground">{plan.label}</p>}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{plan.price}</p>
              <p className="text-xs text-muted-foreground">{t.lek}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <PricingCard data={maleData} isMale={true} />
          <PricingCard data={femaleData} isMale={false} />
        </div>

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">{t.infoTitle}</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{t.hours}</p>
                <p className="text-muted-foreground">{t.hoursText}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{t.rest}</p>
                <p className="text-muted-foreground">{t.restText}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{t.flexible}</p>
                <p className="text-muted-foreground">{t.flexibleText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
