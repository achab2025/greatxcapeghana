
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import WordPressEmbedGuide from '@/components/wordpress/WordPressEmbedGuide';
import ElementorEmbedCode from '@/components/wordpress/ElementorEmbedCode';

const WordPressGuide = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/landing">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Landing
            </Link>
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            WordPress Integration Guide
          </h1>
          <p className="text-xl text-slate-600">
            Learn how to embed your house booking system into your WordPress site
          </p>
        </div>
        
        <div className="space-y-12">
          <ElementorEmbedCode />
          <WordPressEmbedGuide />
        </div>
      </div>
    </div>
  );
};

export default WordPressGuide;
