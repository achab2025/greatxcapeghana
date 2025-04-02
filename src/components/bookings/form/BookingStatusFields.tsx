
import React from 'react';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';

interface BookingStatusFieldsProps {
  form: UseFormReturn<any>;
}

const BookingStatusFields = ({ form }: BookingStatusFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="totalAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Amount ($)</FormLabel>
            <FormControl>
              <Input type="number" {...field} readOnly />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="paymentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bookingStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Booking Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BookingStatusFields;
