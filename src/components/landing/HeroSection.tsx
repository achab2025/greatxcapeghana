
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Calendar } from 'lucide-react';

interface HeroSectionProps {
  showWordPressSection: boolean;
  setShowWordPressSection: (show: boolean) => void;
}

const HeroSection = ({
  showWordPressSection,
  setShowWordPressSection
}: HeroSectionProps) => {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-slate-800 tracking-tight">
              Premium House Rentals
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Discover exceptional properties for your perfect stay. 
              Experience luxury, comfort, and unforgettable moments.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              asChild
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <Link to="/login">
                <Home className="mr-2" size={20} />
                Book Now
              </Link>
            </Button>
            <Button 
              onClick={() => setShowWordPressSection(!showWordPressSection)}
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-base font-medium rounded-lg transition-all duration-200"
            >
              <Calendar className="mr-2" size={20} />
              View Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
