
import React from 'react';
import { payments } from '@/data/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Payments = () => {
  const totalRevenue = payments.reduce((sum, payment) => 
    payment.status === 'successful' ? sum + payment.amount : sum, 0);
  
  const pendingAmount = payments.reduce((sum, payment) => 
    payment.status === 'pending' ? sum + payment.amount : sum, 0);

  const getPaymentStatusBadge = (status: string) => {
    switch(status) {
      case 'successful':
        return <Badge className="bg-green-500">Successful</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch(method) {
      case 'credit_card':
        return <span>💳</span>;
      case 'cash':
        return <span>💵</span>;
      case 'bank_transfer':
        return <span>🏦</span>;
      default:
        return <span>💸</span>;
    }
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
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-white/70">Track and manage all payment transactions.</p>
        </div>
        
        <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription className="text-white/70">Successful payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription className="text-white/70">Yet to be collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${pendingAmount.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="rounded-md border border-white/20 overflow-hidden animate-fade-in" style={{animationDelay: "0.3s"}}>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20 bg-white/5">
                <TableHead className="text-white/90">Payment ID</TableHead>
                <TableHead className="text-white/90">Guest</TableHead>
                <TableHead className="text-white/90">House</TableHead>
                <TableHead className="text-white/90">Amount</TableHead>
                <TableHead className="text-white/90">Payment Date</TableHead>
                <TableHead className="text-white/90">Method</TableHead>
                <TableHead className="text-white/90">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow className="border-white/20">
                  <TableCell colSpan={7} className="text-center text-white/70">No payments found</TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id} className="border-white/20 bg-white/5 hover:bg-white/10">
                    <TableCell className="font-mono text-sm text-white/80">{payment.id}</TableCell>
                    <TableCell className="text-white/80">{payment.guestName}</TableCell>
                    <TableCell className="text-white/80">{payment.houseName}</TableCell>
                    <TableCell className="text-white/80">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-white/80">{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-white/80">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="ml-2 capitalize">
                          {payment.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80">{getPaymentStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
