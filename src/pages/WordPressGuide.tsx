
import React from 'react';
import { Button } from '@/components/ui/button';
import { CodeIcon, ZapIcon, CheckCircleIcon, PlayCircleIcon } from 'lucide-react';

const WordPressGuide = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-8 w-full max-w-full">
          <div className="max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                WordPress Integration Guide
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Embed Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Booking System
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Transform your WordPress site with our premium house rental booking system. 
                Professional, responsive, and ready to go live in minutes.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-2">
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <CodeIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Simple Integration</h3>
                  <p className="text-slate-600">Copy and paste one line of code. No technical skills required.</p>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <ZapIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
                  <p className="text-slate-600">Optimized for speed with instant loading and smooth interactions.</p>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircleIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Fully Responsive</h3>
                  <p className="text-slate-600">Perfect on all devices with mobile-first design principles.</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center px-2">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  <PlayCircleIcon className="w-5 h-5 mr-2" />
                  Start Integration
                </Button>
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg w-full sm:w-auto">
                  View Documentation
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200 max-w-4xl mx-auto">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center justify-center gap-2 text-lg">
                  <CheckCircleIcon className="w-5 h-5" />
                  Quick Setup in 5 Steps:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm text-blue-700">
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-2">1</span>
                    <span className="text-xs sm:text-sm">Edit WordPress page</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-2">2</span>
                    <span className="text-xs sm:text-sm">Switch to HTML mode</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-2">3</span>
                    <span className="text-xs sm:text-sm">Paste embed code</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-2">4</span>
                    <span className="text-xs sm:text-sm">Update your URL</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-2">5</span>
                    <span className="text-xs sm:text-sm">Save & publish!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </div>
  );
};

export default WordPressGuide;
