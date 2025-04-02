
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Booking, House } from '@/lib/types';
import { houses, guests } from '@/data/mockData';

export const useBookingForm = (booking?: Booking, onSubmit: (data: any) => void) => {
  const [availableHouses, setAvailableHouses] = useState<House[]>([]);

  const form = useForm({
    defaultValues: {
      houseId: booking?.houseId || '',
      guestId: booking?.guestId || '',
      checkInDate: booking?.checkInDate || '',
      checkOutDate: booking?.checkOutDate || '',
      totalAmount: booking?.totalAmount || 0,
      paymentStatus: booking?.paymentStatus || 'pending',
      bookingStatus: booking?.bookingStatus || 'confirmed'
    }
  });

  // Calculate available houses
  useEffect(() => {
    // In a real app, this would filter based on the date range
    // For now, just filter out houses under maintenance
    const available = houses.filter(house => 
      house.status !== 'maintenance' || 
      (booking && house.id === booking.houseId)
    );
    setAvailableHouses(available);
  }, [booking]);

  // Calculate total amount when house or dates change
  useEffect(() => {
    const houseId = form.watch('houseId');
    const checkInDate = form.watch('checkInDate');
    const checkOutDate = form.watch('checkOutDate');
    
    if (houseId && checkInDate && checkOutDate) {
      const house = houses.find(h => h.id === houseId);
      if (house) {
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        
        if (nights > 0) {
          const total = house.pricePerNight * nights;
          form.setValue('totalAmount', total);
        }
      }
    }
  }, [form.watch('houseId'), form.watch('checkInDate'), form.watch('checkOutDate'), form]);

  const handleSubmit = (data: any) => {
    const selectedHouse = houses.find(h => h.id === data.houseId);
    const selectedGuest = guests.find(g => g.id === data.guestId);
    
    if (selectedHouse && selectedGuest) {
      const formattedData = {
        ...data,
        houseName: selectedHouse.name,
        guestName: `${selectedGuest.firstName} ${selectedGuest.lastName}`,
        id: booking?.id || `b${Date.now()}`,
        createdAt: booking?.createdAt || new Date().toISOString().split('T')[0]
      };
      
      onSubmit(formattedData);
    }
  };

  return {
    form,
    availableHouses,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};
