
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CodeIcon, ZapIcon, CheckCircleIcon, PlayCircleIcon } from 'lucide-react';
import WordPressEmbedGuide from '@/components/wordpress/WordPressEmbedGuide';
import ElementorEmbedCode from '@/components/wordpress/ElementorEmbedCode';

const WordPressGuide = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
            <Link to="/landing">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            WordPress Integration
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            Embed Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Booking System
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Seamlessly integrate our premium house rental booking system into your WordPress site. 
            Professional, fast, and beautifully designed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg">
              <PlayCircleIcon className="w-5 h-5 mr-2" />
              Quick Start Guide
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
              <CodeIcon className="w-5 h-5 mr-2" />
              View Code Examples
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CodeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Easy Integration</h3>
              <p className="text-slate-400">Copy and paste a simple embed code. No technical expertise required.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ZapIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-400">Optimized for speed and performance. Your users will love it.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Responsive Design</h3>
              <p className="text-slate-400">Looks perfect on all devices. Mobile-first approach.</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow our step-by-step guide to embed your booking system into WordPress
            </p>
          </div>

          <div className="space-y-20">
            <ElementorEmbedCode />
            <WordPressEmbedGuide />
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your WordPress Site?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of satisfied customers who have integrated our booking system
          </p>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg">
            <Link to="/landing">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WordPressGuide;
