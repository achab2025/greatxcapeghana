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
  return <section className="min-h-screen bg-gradient-to-br from-olive-50 to-olive-100 flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        
        <p className="text-xl md:text-2xl text-olive-dark mb-12 max-w-4xl mx-auto leading-relaxed">
          Discover your perfect getaway at our luxury vacation homes. 
          Experience comfort, elegance, and unforgettable memories in the heart of paradise.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button asChild size="lg" className="bg-olive hover:bg-olive-dark text-white px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
            <Link to="/login">
              <LogInIcon className="mr-3" size={24} />
              Start Your Journey
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500" onClick={() => setShowWordPressSection(!showWordPressSection)}>
            <span>
              <ArrowRightIcon className="mr-3" size={24} />
              Explore Houses
            </span>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-olive-dark">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="text-olive/80">Luxury Homes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-olive/80">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-olive/80">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5★</div>
            <div className="text-olive/80">Rating</div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;