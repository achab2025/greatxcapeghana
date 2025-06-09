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
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-olive-50 via-white to-olive-100/30"></div>
      
      {/* Animated background elements */}
      
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-olive rounded-full flex justify-center">
          <div className="w-1 h-3 bg-olive rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;