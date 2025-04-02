
import React from 'react';
import { House } from '@/lib/types';
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

interface HouseSelectProps {
  form: UseFormReturn<any>;
  availableHouses: House[];
}

const HouseSelect = ({ form, availableHouses }: HouseSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="houseId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>House</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a house" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableHouses.map(house => (
                <SelectItem key={house.id} value={house.id}>
                  {house.name} (${house.pricePerNight}/night)
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

export default HouseSelect;
