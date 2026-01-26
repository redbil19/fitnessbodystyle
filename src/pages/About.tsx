import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useLanguage } from "@/contexts/LanguageContext"
import { ArrowRight, Instagram } from "lucide-react"
import { useEffect } from "react"
import coachIndrit from "@/assets/coach-indrit.jpg"
import coachGilda from "@/assets/coach-gilda.jpg"
import gymStory from "@/assets/gym-story.jpg"
import stairs from "@/assets/stairs.jpg"

export default function AboutPage() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const translations = {
    sq: {
      title: "RRETH NESH",
      subtitle: "Misioni ynë - Transformimi i trupit dhe mendjes",
      ourStory: "Historia Jonë",
      storyText: "Fitness BODYSTYLE u themelua me një vizion të thjeshtë por të fuqishëm - t'i përmbushim njerëzit për të ardhjen më të mirë. Me më shumë se 10 vite përvojë në industrinë e fitnessit, ne kemi ndërtuar një komunitet të dedikuar të atletëve, fillestarëve dhe të gjithëve në mes.",
      mission: "Misioni",
      missionText: "Të ofrojmë mjedis moderne, të sigurt dhe përfshirës ku çdo anëtar mund të arrijë qëllimet e tij të fitnessit, pavarësisht nivelit të fillimit.",
      values: "Vlerat Jonë",
      value1: "Dedikimi - Jemi i përkushtuar ndaj suksesit tuaj",
      value2: "Profesionalizmi - Trajnerë me sertifikatim ndërkombëtar",
      value3: "Komunitet - Një familje që mbështet njëra-tjetrën",
      value4: "Inovacion - Pajisje dhe teknika më të reja",
      coaches: "Trajnerët Tanë",
      coachDesc: "Ekipi ynë përbëhet nga trajnerë të përvojë dhe të pasionuar që gati janë të ndihmojnë në çdo hap të udhëtimit tuaj.",
      facilities: "Objektet Tona",
      facilities1: "Pajisje moderne të kondicionimit kardiovaskular",
      facilities2: "Dhoma të ndarë për trajnim me pesa",
      facilities3: "Studio yoga dhe pilates",
      facilities4: "Mbështetje për hyrje në formë para dhe pas trenimit",
      joinUs: "Bashkohu me ne sot",
      contactNow: "Kontakto Tani"
    },
    en: {
      title: "ABOUT US",
      subtitle: "Our Mission - Transform Your Body and Mind",
      ourStory: "Our Story",
      storyText: "Fitness BODYSTYLE was founded with a simple yet powerful vision - to empower people for a better future. With over 10 years of experience in the fitness industry, we have built a dedicated community of athletes, beginners, and everyone in between.",
      mission: "Our Mission",
      missionText: "To provide a modern, safe and inclusive environment where every member can achieve their fitness goals, regardless of their starting level.",
      values: "Our Values",
      value1: "Dedication - We are committed to your success",
      value2: "Professionalism - Internationally certified trainers",
      value3: "Community - A family that supports each other",
      value4: "Innovation - Latest equipment and techniques",
      coaches: "Our Coaches",
      coachDesc: "Our team consists of experienced and passionate trainers who are ready to help you at every step of your journey.",
      facilities: "Our Facilities",
      facilities1: "Modern cardiovascular conditioning equipment",
      facilities2: "Separate rooms for weight training",
      facilities3: "Yoga and pilates studios",
      facilities4: "Support for pre and post workout nutrition",
      joinUs: "Join Us Today",
      contactNow: "Get In Touch"
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-secondary py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              {t.title}
            </h1>
            <p className="text-2xl text-muted-foreground mb-8">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-6">{t.ourStory}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.storyText}
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={stairs} 
                  alt="Fitness Stairs"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 px-4 md:px-8 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-3xl font-bold text-primary mb-6">{t.mission}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.missionText}
                </p>
              </div>

              {/* Values */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-3xl font-bold text-primary mb-6">{t.values}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{t.value1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{t.value2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{t.value3}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{t.value4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Coaches */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6 text-center">{t.coaches}</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t.coachDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-secondary rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="h-96 bg-card flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-primary mb-2">Gilda</h3>
                    <p className="text-muted-foreground mb-4">Specialized in strength training</p>
                    <a href="https://www.instagram.com/healthybygilda/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                      <Instagram className="w-5 h-5" />
                      <span>@healthybygilda</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="h-96 bg-card flex items-center justify-center">
                  <img 
                    src={coachIndrit} 
                    alt="Coach Indrit" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">Indrit</h3>
                  <p className="text-muted-foreground mb-4">Specialized in cardio and conditioning</p>
                  <a href="https://www.instagram.com/indriiit_/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Instagram className="w-5 h-5" />
                    <span>@indriiit_</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-20 px-4 md:px-8 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">{t.facilities}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <p className="text-lg text-muted-foreground">{t.facilities1}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <p className="text-lg text-muted-foreground">{t.facilities2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <p className="text-lg text-muted-foreground">{t.facilities3}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <p className="text-lg text-muted-foreground">{t.facilities4}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">{t.joinUs}</h2>
            <a href="/#contact" className="inline-block btn-primary-gym">
              {t.contactNow}
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
