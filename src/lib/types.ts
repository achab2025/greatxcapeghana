
export interface House {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  amenities: string[];
  status: 'available' | 'booked' | 'maintenance';
  imageUrl: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  bookingHistory: string[];
}

export interface Booking {
  id: string;
  houseId: string;
  houseName: string;
  guestId: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  bookingStatus: 'confirmed' | 'canceled' | 'completed';
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
  status: 'successful' | 'pending' | 'failed';
  guestName: string;
  houseName: string;
}

export interface DashboardSummary {
  totalBookings: number;
  availableHouses: number;
  occupiedHouses: number;
  pendingPayments: number;
  revenue: {
    current: number;
    previous: number;
  };
}
