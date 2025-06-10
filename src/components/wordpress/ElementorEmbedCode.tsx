
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, CodeIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ElementorEmbedCode = () => {
  const embedCode = `<iframe src="https://your-app-name.lovable.app" width="100%" height="600" frameborder="0"></iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Code Copied!",
      description: "Paste this into Elementor HTML widget.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CodeIcon className="w-5 h-5" />
          Elementor Embed Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-600">
          Copy this code and paste it into an Elementor HTML widget:
        </p>
        
        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <code>{embedCode}</code>
        </div>
        
        <Button onClick={copyEmbedCode} className="w-full">
          <CopyIcon className="w-4 h-4 mr-2" />
          Copy Code for Elementor
        </Button>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">How to use in Elementor:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Edit your page in Elementor</li>
            <li>2. Add an "HTML" widget</li>
            <li>3. Paste the code above</li>
            <li>4. Replace "your-app-name" with your actual app URL</li>
            <li>5. Save and publish</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElementorEmbedCode;
