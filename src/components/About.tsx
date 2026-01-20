import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dumbbell, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import gymCardio from "@/assets/gym-cardio.jpg";

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Award, value: "14+", label: t("yearsExperience") },
    { icon: Users, value: "2000+", label: t("happyMembers") },
    { icon: Dumbbell, value: "100+", label: t("equipment") },
  ];

  return (
    <section
      id="about"
      className="section-padding bg-gradient-hero relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={gymCardio}
                alt="Fitness Bodystyle Interior"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            {/* Yellow accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-primary rounded-lg" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-lg" />
          </div>

          {/* Content Section */}
          <div>
            <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-sm mb-6">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                {t("aboutTitle")}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              {t("aboutSubtitle")}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("aboutDescription")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-3">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="font-display text-3xl md:text-4xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* BLOG CTA */}
            <Link
              to="/blog"
              className="inline-block px-6 py-3 border-2 border-primary text-primary font-bold uppercase tracking-wide rounded-sm hover:bg-primary hover:text-background transition-all duration-300"
            >
              {language === "sq"
                ? "Zbulo më shumë rreth fitnesit në blogun tonë"
                : "Find out more about fitness in our blog"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;