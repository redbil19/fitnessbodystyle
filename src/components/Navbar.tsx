import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "home", href: "/", label: "home" },
    { key: "about", href: "/about", label: "about" },
    { key: "services", href: "/#services", label: "services" },
    { key: "gallery", href: "/#gallery", label: "gallery" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "sq" ? "en" : "sq");
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // If it's an anchor link and we're on home page, scroll to section
    if (href.startsWith("/#") && location.pathname === "/") {
      setTimeout(() => {
        const elementId = href.slice(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-xl md:text-2xl text-primary">
              FITNESS
            </span>
            <span className="font-display text-sm md:text-base text-foreground tracking-widest">
              BODYSTYLE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium uppercase tracking-wide text-sm"
              >
                {t(link.label)}
              </Link>
            ))}

            {/* BLOG PAGE */}
            <Link
              to="/blog"
              className="text-foreground/80 hover:text-primary transition-colors font-medium uppercase tracking-wide text-sm"
            >
              BLOG
            </Link>

            {/* CONTACT LINK */}
            <a
              href="#contact"
              onClick={() => {
                if (location.pathname === "/") {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="text-foreground/80 hover:text-primary transition-colors font-medium uppercase tracking-wide text-sm"
            >
              {t("contact")}
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 border border-primary/50 rounded-sm hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">
                {language.toUpperCase()}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 border border-primary/50 rounded-sm"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary">
                {language.toUpperCase()}
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border animate-slide-down">
            <div className="container mx-auto px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block py-3 text-foreground/80 hover:text-primary transition-colors font-medium uppercase tracking-wide border-b border-border/50 last:border-0"
                >
                  {t(link.label)}
                </Link>
              ))}

              {/* BLOG PAGE */}
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-foreground/80 hover:text-primary transition-colors font-medium uppercase tracking-wide border-b border-border/50"
              >
                BLOG
              </Link>

              {/* CONTACT LINK */}
              <a
                href="#contact"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (location.pathname === "/") {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className="block py-3 text-foreground/80 hover:text-primary transition-colors font-medium uppercase tracking-wide border-b border-border/50"
              >
                {t("contact")}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;