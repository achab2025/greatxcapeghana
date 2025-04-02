
import React from 'react';
import { Guest } from '@/lib/types';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';

interface GuestSelectProps {
  form: UseFormReturn<any>;
  guests: Guest[];
}

const GuestSelect = ({ form, guests }: GuestSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="guestId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Guest</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a guest" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {guests.map(guest => (
                <SelectItem key={guest.id} value={guest.id}>
                  {guest.firstName} {guest.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GuestSelect;
