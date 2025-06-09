
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
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-6">
          Welcome to Your Property Management
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Streamline your bookings, manage guests, and grow your hospitality business with our comprehensive platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <LogInIcon className="mr-2" size={20} />
              Get Started
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={() => setShowWordPressSection(!showWordPressSection)}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
          >
            {showWordPressSection ? 'Hide' : 'View'} WordPress Integration
            <ArrowRightIcon className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
