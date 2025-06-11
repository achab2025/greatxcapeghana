
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogInIcon, ArrowRightIcon } from 'lucide-react';

interface HeroSectionProps {
  showWordPressSection: boolean;
  setShowWordPressSection: (show: boolean) => void;
}

const HeroSection = ({
  showWordPressSection,
  setShowWordPressSection
}: HeroSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-olive-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-olive-dark leading-tight">
          Welcome to 
          <span className="block text-olive">House Haven</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-olive-dark/70 leading-relaxed">
          Discover extraordinary homes for your perfect getaway. 
          Book stunning properties with ease and create unforgettable memories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-olive hover:bg-olive-dark text-white px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500"
          >
            <Link to="/login">
              <LogInIcon className="mr-3" size={24} />
              Start Booking
            </Link>
          </Button>
          <Button 
            onClick={() => setShowWordPressSection(!showWordPressSection)}
            size="lg"
            variant="outline"
            className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-12 py-8 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500"
          >
            <ArrowRightIcon className="mr-3" size={24} />
            View Houses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
