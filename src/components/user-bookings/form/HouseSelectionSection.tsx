
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HomeIcon, InfoIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
              <FormLabel className="text-green-700">Choose a House</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                defaultValue={defaultHouseId}
              >
                <FormControl>
                  <SelectTrigger className="bg-white border-green-200">
                    <SelectValue placeholder="Select an accommodation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableHouses.map(house => (
                    <SelectItem key={house.id} value={house.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{house.name}</span>
                        <Badge variant="outline" className="ml-2 bg-green-100 text-green-700">
                          ${house.pricePerNight}/night
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        {selectedHouse && (
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-800">{selectedHouse.name}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(selectedHouse.id)}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <InfoIcon size={16} className="mr-1" />
                View Details
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Price per night:</span>
                <span className="font-medium text-green-700">${selectedHouse.pricePerNight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Max occupancy:</span>
                <span className="font-medium">{selectedHouse.maxOccupancy} guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <Badge variant={selectedHouse.status === 'available' ? 'default' : 'secondary'}>
                  {selectedHouse.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HouseSelectionSection;
