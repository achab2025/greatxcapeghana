export interface Booking {
  id: string;
  guestId: string;
  guestName: string;
  houseId: string;
  houseName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  bookingStatus: 'confirmed' | 'checked-in' | 'completed' | 'canceled';
  paymentStatus: string;
  createdAt?: string;
}

export interface DashboardSummary {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
  pendingBookings: number;
  availableHouses: number;
  occupancyRate: number;
  pendingPayments: number;
  revenue: {
    current: number;
    previous: number;
  };
}

export interface House {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  amenities: string[];
  status: string;
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

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: string;
  guestName: string;
  houseName: string;
}
