
import React from 'react';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';

interface DateRangeFieldsProps {
  form: UseFormReturn<any>;
}

const DateRangeFields = ({ form }: DateRangeFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="checkInDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Check-in Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="checkOutDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Check-out Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DateRangeFields;
