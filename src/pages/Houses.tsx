
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import HouseCard from '@/components/houses/HouseCard';
import { houses } from '@/data/mockData';
import { House } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Houses = () => {
  const [housesList, setHousesList] = useState<House[]>(houses);

  const handleEdit = (house: House) => {
    // In a real app, this would open a modal or redirect to edit form
    toast({
      title: "Edit House",
      description: `Editing ${house.name}`,
    });
  };

  const handleBookNow = (house: House) => {
    // In a real app, this would open a booking form
    toast({
      title: "Book House",
      description: `Creating a new booking for ${house.name}`,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Houses</h1>
            <p className="text-muted-foreground">Manage your three houses.</p>
          </div>
          
          <Button>
            <PlusIcon size={16} className="mr-2" />
            Add House
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {housesList.map((house) => (
            <HouseCard 
              key={house.id} 
              house={house}
              onEdit={handleEdit}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Houses;
