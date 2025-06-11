
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, SparklesIcon, CodeIcon, ZapIcon } from 'lucide-react';
import WordPressEmbedGuide from '@/components/wordpress/WordPressEmbedGuide';
import ElementorEmbedCode from '@/components/wordpress/ElementorEmbedCode';

const WordPressGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-purple-200/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-200/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="glass-card border-white/40 hover:bg-white/20 backdrop-blur-sm">
              <Link to="/landing">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Landing
              </Link>
            </Button>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4 mr-2 text-blue-600" />
              WordPress Integration Made Easy
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent leading-tight">
              Embed Your
              <span className="block">Booking System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your WordPress site with our premium house rental booking system. 
              Seamless integration, stunning design, and powerful functionality.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
              <div className="glass-card p-6 rounded-2xl border border-white/40">
                <CodeIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Easy Integration</h3>
                <p className="text-slate-600 text-sm">Simple copy-paste embed code</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/40">
                <ZapIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Lightning Fast</h3>
                <p className="text-slate-600 text-sm">Optimized for performance</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/40">
                <SparklesIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Beautiful Design</h3>
                <p className="text-slate-600 text-sm">Matches your site perfectly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-6 pb-20">
        <div className="space-y-16">
          <ElementorEmbedCode />
          <WordPressEmbedGuide />
        </div>
      </div>
    </div>
  );
};

export default WordPressGuide;
