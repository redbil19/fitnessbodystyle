import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';
import gymInterior1 from '@/assets/gym-interior-1.jpg';
import gymInterior2 from '@/assets/gym-interior-2.jpg';
import gymInterior3 from '@/assets/gym-interior-3.jpg';
import gymCardio from '@/assets/gym-cardio.jpg';
import gymEquipment from '@/assets/gym-equipment.jpg';
import gymStory from '@/assets/gym-story.jpg';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: gymInterior1, alt: 'Gym Interior - Weight Area' },
    { src: gymCardio, alt: 'Cardio Area' },
    { src: gymStory, alt: 'Gym Story' },
    { src: gymInterior2, alt: 'Gym Facilities' },
    { src: gymEquipment, alt: 'Modern Equipment' },
    { src: gymInterior3, alt: 'Training Area' },
  ];

  return (
    <section id="gallery" className="section-padding bg-background relative">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-sm mb-6">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              {t('galleryTitle')}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('gallerySubtitle')}
          </h2>
        </div>

        {/* Gallery Grid - Clean Uniform Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">+</span>
                </div>
              </div>
              {/* Border on hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary transition-colors duration-300 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 bg-primary py-8 px-6 rounded-lg text-center">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-foreground">
            {t('workHard')}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
