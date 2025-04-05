
import React, { useState } from 'react';
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white/20 to-gray-100/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80 -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-olive/20 animate-float"
            style={{
              width: `${Math.random() * 25 + 5}px`,
              height: `${Math.random() * 25 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex-1 p-8 z-10 text-white">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Houses</h1>
            <p className="text-white/70">Manage your three houses.</p>
          </div>
          
          <Button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
            <PlusIcon size={16} className="mr-2" />
            Add House
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
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
