
import React from 'react';
import { Button } from '@/components/ui/button';
import { CodeIcon, ZapIcon, CheckCircleIcon, PlayCircleIcon, CopyIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const WordPressGuide = () => {
  const embedCode = `<iframe 
  src="https://your-app-name.lovable.app" 
  width="100%" 
  height="100vh" 
  frameborder="0" 
  style="border: none;">
</iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed Code Copied!",
      description: "Paste this code into your WordPress page editor.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12">
          <div className="max-w-7xl mx-auto w-full">
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

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Features */}
              <div className="space-y-8">
                <div className="grid gap-6">
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CodeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Simple Integration</h3>
                        <p className="text-slate-600">Copy and paste one line of code. No technical skills required.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ZapIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Lightning Fast</h3>
                        <p className="text-slate-600">Optimized for speed with instant loading and smooth interactions.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Fully Responsive</h3>
                        <p className="text-slate-600">Perfect on all devices with mobile-first design principles.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <PlayCircleIcon className="w-5 h-5 mr-2" />
                    Start Integration
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                    View Documentation
                  </Button>
                </div>
              </div>

              {/* Right Column - Embed Code */}
              <div className="lg:sticky lg:top-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-white" />
                      </div>
                      Embed Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-slate-600 mb-4">
                        Copy this code and paste it into your WordPress page editor:
                      </p>
                      
                      <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-slate-200">
                        <pre className="whitespace-pre-wrap">{embedCode}</pre>
                      </div>
                    </div>
                    
                    <Button onClick={copyEmbedCode} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-6 text-lg shadow-lg">
                      <CopyIcon className="w-5 h-5 mr-2" />
                      Copy Embed Code
                    </Button>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5" />
                        Quick Setup Steps:
                      </h4>
                      <ol className="text-sm text-blue-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                          <span>Edit your WordPress page</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                          <span>Switch to HTML/Text mode</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                          <span>Paste the embed code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                          <span>Replace "your-app-name" with your URL</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                          <span>Save and publish!</span>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
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
