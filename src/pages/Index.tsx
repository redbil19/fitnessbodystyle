import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Gallery from '@/components/Gallery';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import gymStory from '@/assets/gym-story.jpg';

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      
      {/* Featured Image Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <img 
              src={gymStory} 
              alt="Fitness Bodystyle" 
              className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      
      <Pricing />
      <BlogPreview />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
