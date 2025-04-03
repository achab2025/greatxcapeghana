
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface GuestHeaderProps {
  onCreateGuest: () => void;
}

const GuestHeader = ({ onCreateGuest }: GuestHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Guests</h1>
        <p className="text-muted-foreground">Manage your guest profiles and information.</p>
      </div>
      
      <Button onClick={onCreateGuest}>
        <PlusIcon size={16} className="mr-2" />
        New Guest
      </Button>
    </div>
  );
};

export default GuestHeader;
