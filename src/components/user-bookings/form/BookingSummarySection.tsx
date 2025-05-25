
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSignIcon } from 'lucide-react';
import { House } from '@/lib/types';

interface BookingSummarySectionProps {
  selectedHouse: House;
  nights: number;
  totalAmount: number;
}

const BookingSummarySection = ({ selectedHouse, nights, totalAmount }: BookingSummarySectionProps) => {
  return (
    <Card className="border-amber-100 bg-amber-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg text-amber-800">
          <DollarSignIcon className="mr-2" size={20} />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Rate per night:</span>
            <span>${selectedHouse.pricePerNight}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Number of nights:</span>
            <span>{nights}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Amount:</span>
            <span className="text-2xl font-bold text-amber-700">
              ${totalAmount || 0}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummarySection;
