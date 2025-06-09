
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
    <section className="min-h-screen bg-gradient-to-br from-olive-50 to-olive-100 flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-olive-dark leading-tight">
          Three House
          <span className="block text-olive">Haven</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-olive-dark/80 leading-relaxed">
          Experience luxury and comfort in our carefully curated collection of premium vacation homes. 
          Your perfect getaway awaits.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Button 
            asChild
            size="lg"
            className="bg-olive hover:bg-olive-dark text-white px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/login">
              <LogInIcon className="mr-3" size={24} />
              Start Booking
            </Link>
          </Button>
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="#houses">
              <ArrowRightIcon className="mr-3" size={24} />
              View Houses
            </Link>
          </Button>
        </div>

        {/* WordPress Integration Toggle */}
        <div className="mb-8">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-olive/50 text-olive hover:bg-olive/10 px-8 py-4 text-lg rounded-xl shadow-lg transition-all duration-300"
            onClick={() => setShowWordPressSection(!showWordPressSection)}
          >
            {showWordPressSection ? 'Hide' : 'Show'} WordPress Houses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
