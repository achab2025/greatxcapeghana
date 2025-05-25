
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HomeIcon, InfoIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { House } from '@/lib/types';

interface HouseSelectionSectionProps {
  form: UseFormReturn<any>;
  availableHouses: House[];
  selectedHouse: House | undefined;
  defaultHouseId?: string;
  onViewDetails: (houseId: string) => void;
}

const HouseSelectionSection = ({ 
  form, 
  availableHouses, 
  selectedHouse, 
  defaultHouseId, 
  onViewDetails 
}: HouseSelectionSectionProps) => {
  return (
    <Card className="border-green-100 bg-green-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg text-green-800">
          <HomeIcon className="mr-2" size={20} />
          Select Your Accommodation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="houseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Choose House</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value || defaultHouseId}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Select your perfect getaway" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    {availableHouses.map(house => (
                      <SelectItem key={house.id} value={house.id}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{house.name}</span>
                          <Badge variant="outline" className="ml-2">
                            ${house.pricePerNight}/night
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {selectedHouse && (
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-800">{selectedHouse.name}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(selectedHouse.id)}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <InfoIcon className="mr-1" size={14} />
                View Details
              </Button>
            </div>
            <p className="text-sm text-slate-600 mb-3">{selectedHouse.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Max Guests: {selectedHouse.maxOccupancy}</span>
              <span className="font-medium text-green-700">${selectedHouse.pricePerNight}/night</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HouseSelectionSection;
