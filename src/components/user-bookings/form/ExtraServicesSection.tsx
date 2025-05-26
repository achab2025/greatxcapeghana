
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react';

interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ExtraServicesSectionProps {
  form: UseFormReturn<any>;
  onServicesChange: (services: ExtraService[], total: number) => void;
}

const extraServices: ExtraService[] = [
  {
    id: 'cleaning',
    name: 'Professional Cleaning',
    description: 'Deep cleaning service before your arrival',
    price: 75
  },
  {
    id: 'grocery',
    name: 'Grocery Shopping',
    description: 'Pre-arrival grocery shopping and stocking',
    price: 50
  },
  {
    id: 'pickup',
    name: 'Airport Pickup',
    description: 'Private car service from airport to accommodation',
    price: 120
  },
  {
    id: 'chef',
    name: 'Private Chef (1 meal)',
    description: 'Professional chef for one special meal',
    price: 200
  },
  {
    id: 'spa',
    name: 'In-House Spa Service',
    description: 'Relaxing massage and spa treatment at your accommodation',
    price: 150
  }
];

const ExtraServicesSection = ({ form, onServicesChange }: ExtraServicesSectionProps) => {
  const [selectedServices, setSelectedServices] = React.useState<ExtraService[]>([]);

  const handleServiceChange = (service: ExtraService, checked: boolean) => {
    let updatedServices;
    if (checked) {
      updatedServices = [...selectedServices, service];
    } else {
      updatedServices = selectedServices.filter(s => s.id !== service.id);
    }
    
    setSelectedServices(updatedServices);
    const total = updatedServices.reduce((sum, s) => sum + s.price, 0);
    onServicesChange(updatedServices, total);
  };

  return (
    <Card className="border-blue-100 bg-blue-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg text-blue-800">
          <StarIcon className="mr-2" size={20} />
          Extra Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {extraServices.map(service => (
          <div key={service.id} className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Checkbox
                  id={service.id}
                  onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor={service.id} className="font-medium text-blue-800 cursor-pointer">
                    {service.name}
                  </label>
                  <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                </div>
              </div>
              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700">
                ${service.price}
              </Badge>
            </div>
          </div>
        ))}
        
        {selectedServices.length > 0 && (
          <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Selected Services:</h4>
            <div className="space-y-1">
              {selectedServices.map(service => (
                <div key={service.id} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span className="font-medium">${service.price}</span>
                </div>
              ))}
              <div className="border-t border-blue-300 pt-2 mt-2 flex justify-between font-medium text-blue-800">
                <span>Total Extra Services:</span>
                <span>${selectedServices.reduce((sum, s) => sum + s.price, 0)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExtraServicesSection;
