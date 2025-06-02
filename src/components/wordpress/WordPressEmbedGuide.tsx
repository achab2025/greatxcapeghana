
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WordPressEmbedGuide = () => {
  const embedCode = `<iframe 
  src="https://your-app-name.lovable.app" 
  width="100%" 
  height="800" 
  frameborder="0" 
  style="border: none; border-radius: 8px;">
</iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed Code Copied!",
      description: "Paste this code into your WordPress page editor.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLinkIcon className="w-5 h-5" />
            Embed in WordPress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Follow these steps to embed your house booking system into your WordPress site:
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Step 1: Publish Your App</h3>
              <p className="text-sm text-slate-600">
                Click the "Publish" button in the top right of your Lovable editor to get your live URL.
              </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Step 2: Copy Embed Code</h3>
              <p className="text-sm text-slate-600 mb-3">
                Copy the iframe code below and replace "your-app-name" with your actual app URL:
              </p>
              <div className="bg-slate-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                <pre>{embedCode}</pre>
              </div>
              <Button 
                onClick={copyEmbedCode}
                className="mt-3"
                size="sm"
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy Embed Code
              </Button>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Step 3: Add to WordPress</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Go to your WordPress admin dashboard</li>
                <li>• Edit the page where you want to show the houses</li>
                <li>• Switch to "Text" or "HTML" mode in the editor</li>
                <li>• Paste the iframe code where you want it to appear</li>
                <li>• Save and publish your page</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-800">Pro Tips:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Adjust the height value (800px) based on your content</li>
                <li>• Use width="100%" for responsive design</li>
                <li>• Test on mobile devices to ensure it looks good</li>
                <li>• You can customize the border-radius for styling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordPressEmbedGuide;
