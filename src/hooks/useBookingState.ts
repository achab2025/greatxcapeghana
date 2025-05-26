
import { useState } from 'react';

export const useBookingState = () => {
  const [showHouseDetail, setShowHouseDetail] = useState(false);
  const [selectedHouseForDetail, setSelectedHouseForDetail] = useState<string>('');
  const [extraServices, setExtraServices] = useState<any[]>([]);
  const [extraServicesTotal, setExtraServicesTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const handleViewDetails = (houseId: string) => {
    setSelectedHouseForDetail(houseId);
    setShowHouseDetail(true);
  };

  const handleExtraServicesChange = (services: any[], total: number) => {
    setExtraServices(services);
    setExtraServicesTotal(total);
    console.log(`Extra services total: $${total}`);
  };

  return {
    showHouseDetail,
    setShowHouseDetail,
    selectedHouseForDetail,
    extraServices,
    extraServicesTotal,
    showPayment,
    setShowPayment,
    bookingData,
    setBookingData,
    handleViewDetails,
    handleExtraServicesChange
  };
};
