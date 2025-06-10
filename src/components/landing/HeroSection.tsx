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

      
    </section>;
};
export default HeroSection;