
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { House } from '@/lib/types';
import { CalendarIcon, DollarSignIcon } from 'lucide-react';

interface BookingSummarySectionProps {
  selectedHouse: House;
  nights: number;
  totalAmount: number;
}

const BookingSummarySection = ({ selectedHouse, nights, totalAmount }: BookingSummarySectionProps) => {
  const baseAmount = selectedHouse.pricePerNight * nights;
  const extraServicesAmount = totalAmount - baseAmount;

  return (
    <Card className="border-purple-100 bg-purple-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg text-purple-800">
          <DollarSignIcon className="mr-2" size={20} />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Accommodation</span>
              <span className="font-medium">{selectedHouse.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-700 flex items-center">
                <CalendarIcon className="mr-1" size={16} />
                Duration
              </span>
              <span className="font-medium">{nights} night{nights > 1 ? 's' : ''}</span>
            </div>
            
            <div className="border-t border-purple-100 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accommodation ({nights} × ${selectedHouse.pricePerNight})</span>
                <span>${baseAmount.toFixed(2)}</span>
              </div>
              
              {extraServicesAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Extra Services</span>
                  <span>${extraServicesAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-purple-200 pt-2 flex justify-between text-lg font-bold text-purple-800">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 text-center">
          * Final payment will be processed securely through PayPal
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummarySection;
