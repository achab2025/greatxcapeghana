
import React from 'react';
import { Guest } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GuestForm from '@/components/guests/GuestForm';

interface GuestFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  guest?: Guest;
  onSubmit: (data: Guest) => void;
  onCancel: () => void;
}

const GuestFormDialog = ({ 
  isOpen, 
  onOpenChange, 
  guest, 
  onSubmit, 
  onCancel 
}: GuestFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {guest ? 'Edit Guest' : 'Create New Guest'}
          </DialogTitle>
        </DialogHeader>
        <GuestForm 
          guest={guest}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GuestFormDialog;
