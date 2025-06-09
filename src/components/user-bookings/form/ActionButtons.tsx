
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  isFormValid: boolean;
  finalTotal: number;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ActionButtons = ({ isFormValid, finalTotal, onCancel, onSubmit }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-end space-x-4 pt-6 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8"
      >
        Cancel
      </Button>
      <Button 
        type="button"
        disabled={!isFormValid} 
        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={(e) => {
          console.log('🖱️ BUTTON CLICK: Button clicked, form valid:', isFormValid);
          console.log('🖱️ BUTTON CLICK: Final total:', finalTotal);
          if (!isFormValid) {
            e.preventDefault();
            console.log('🚫 BUTTON CLICK: Button click prevented due to invalid form');
            return;
          }
          console.log('✅ BUTTON CLICK: Button click proceeding to payment');
          onSubmit(e);
        }}
      >
        Proceed to Payment {finalTotal > 0 ? `($${finalTotal.toFixed(2)})` : '(Calculate Total)'}
      </Button>
    </div>
  );
};

export default ActionButtons;
