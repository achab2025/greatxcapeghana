
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogInIcon, ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-olive via-olive-dark to-olive text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          Ready for Your
          <span className="block">Perfect Getaway?</span>
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
          Join thousands of happy guests who have experienced the magic of our homes. 
          Your dream vacation is just one click away.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Button 
            asChild
            size="lg"
            className="bg-white text-olive hover:bg-olive-light hover:text-olive-dark px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
          >
            <Link to="/login">
              <LogInIcon className="mr-3" size={24} />
              Book Your Stay
            </Link>
          </Button>
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-olive px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500"
          >
            <Link to="/houses">
              <ArrowRightIcon className="mr-3" size={24} />
              Explore More
            </Link>
          </Button>
        </div>

        {/* WordPress Integration Link */}
        <div className="mb-12">
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl shadow-lg transition-all duration-300"
          >
            <Link to="/wordpress-guide">
              <ExternalLinkIcon className="mr-3" size={20} />
              Embed in WordPress
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-80">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-white/80">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-white/80">Customer Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-white/80">Secure Booking</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4.9★</div>
            <div className="text-white/80">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
