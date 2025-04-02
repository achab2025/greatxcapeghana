export interface Booking {
  id: string;
  guestName: string;
  houseName: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
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
