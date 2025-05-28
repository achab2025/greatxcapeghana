
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogInIcon, ArrowRightIcon } from 'lucide-react';

interface HeroSectionProps {
  showWordPressSection: boolean;
  setShowWordPressSection: (show: boolean) => void;
}

const HeroSection = ({ showWordPressSection, setShowWordPressSection }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-olive-50 via-white to-olive-100/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-olive/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-olive-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-olive/3 to-olive-light/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 text-olive-dark leading-none tracking-tight">
            Three House
            <span className="block text-olive bg-gradient-to-r from-olive to-olive-light bg-clip-text text-transparent">
              Haven
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-olive-dark/70 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Discover extraordinary vacation homes where luxury meets comfort. 
            <span className="block mt-2 text-olive">Your perfect escape awaits.</span>
          </p>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-olive hover:bg-olive-dark text-white px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-olive/25"
            >
              <Link to="/login">
                <LogInIcon className="mr-3" size={24} />
                Start Your Journey
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 bg-white/80 backdrop-blur-sm"
            >
              <Link to="/houses">
                <ArrowRightIcon className="mr-3" size={24} />
                Explore Houses
              </Link>
            </Button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-dark mb-2">3</div>
              <div className="text-olive-dark/70">Premium Houses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-dark mb-2">5★</div>
              <div className="text-olive-dark/70">Guest Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-dark mb-2">24/7</div>
              <div className="text-olive-dark/70">Support</div>
            </div>
          </div>

          {/* WordPress houses toggle */}
          <div className="mt-16">
            <Button
              onClick={() => setShowWordPressSection(!showWordPressSection)}
              variant="ghost"
              className="text-olive hover:bg-olive/10 px-8 py-4 text-lg rounded-xl"
            >
              {showWordPressSection ? 'Hide' : 'View'} WordPress Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-olive rounded-full flex justify-center">
          <div className="w-1 h-3 bg-olive rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
