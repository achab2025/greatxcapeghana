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
  return <Card className="border-green-100 bg-green-50/30">
      
      
    </Card>;
};
export default HouseSelectionSection;