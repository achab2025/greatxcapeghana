
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import DateRangeFields from '@/components/bookings/form/DateRangeFields';

interface DateSelectionSectionProps {
  form: UseFormReturn<any>;
  nights: number;
}

const DateSelectionSection = ({ form, nights }: DateSelectionSectionProps) => {
  return (
    <Card className="border-purple-100 bg-purple-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg text-purple-800">
          <CalendarIcon className="mr-2" size={20} />
          Select Your Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DateRangeFields form={form} />
        {nights > 0 && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Duration:</span>
              <span className="font-medium text-purple-700">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateSelectionSection;
