
import React from 'react';
import { Button } from '@/components/ui/button';
import { CodeIcon, ZapIcon, CheckCircleIcon, PlayCircleIcon } from 'lucide-react';

const WordPressGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12">
          <div className="max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 text-sm font-medium mb-8">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                WordPress Integration Guide
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Embed Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Booking System
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Transform your WordPress site with our premium house rental booking system. 
                Professional, responsive, and ready to go live in minutes.
              </p>
            </div>

            {/* Features Grid - Now Full Width */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <CodeIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Simple Integration</h3>
                  <p className="text-slate-600 text-lg">Copy and paste one line of code. No technical skills required.</p>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <ZapIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Lightning Fast</h3>
                  <p className="text-slate-600 text-lg">Optimized for speed with instant loading and smooth interactions.</p>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Fully Responsive</h3>
                  <p className="text-slate-600 text-lg">Perfect on all devices with mobile-first design principles.</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto mb-12">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-8 text-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <PlayCircleIcon className="w-6 h-6 mr-3" />
                  Start Integration
                </Button>
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-8 text-xl">
                  View Documentation
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200 max-w-3xl mx-auto">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center justify-center gap-3 text-xl">
                  <CheckCircleIcon className="w-6 h-6" />
                  Quick Setup in 5 Steps:
                </h4>
                <div className="grid sm:grid-cols-5 gap-4 text-sm text-blue-700">
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2">1</span>
                    <span>Edit WordPress page</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2">2</span>
                    <span>Switch to HTML mode</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2">3</span>
                    <span>Paste embed code</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2">4</span>
                    <span>Update your URL</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2">5</span>
                    <span>Save & publish!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </div>
  );
};

export default WordPressGuide;
