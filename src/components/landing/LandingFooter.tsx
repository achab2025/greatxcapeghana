
import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="bg-olive-dark text-white/90 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-6 text-white">Three House Haven</h3>
            <p className="mb-6 text-white/80 leading-relaxed text-lg max-w-md">
              Creating unforgettable vacation experiences since 2023. 
              Your perfect getaway is our passion.
            </p>
            <div className="flex space-x-4">
              {/* Social media placeholder icons */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-sm">i</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Contact</h3>
            <div className="space-y-4 text-white/80">
              <div>
                <div className="font-medium">Email</div>
                <div>info@threehousehaven.com</div>
              </div>
              <div>
                <div className="font-medium">Phone</div>
                <div>(555) 123-4567</div>
              </div>
              <div>
                <div className="font-medium">Support</div>
                <div>Available 24/7</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/houses" className="text-white/80 hover:text-white transition-colors text-lg">Our Houses</Link></li>
              <li><Link to="/login" className="text-white/80 hover:text-white transition-colors text-lg">Login</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-lg">About Us</Link></li>
              <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-lg">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70 text-lg">&copy; {new Date().getFullYear()} Three House Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
