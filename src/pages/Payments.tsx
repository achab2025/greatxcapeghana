
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative overflow-hidden">
      <div className="flex-1 p-8 z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-olive-dark">Payments</h1>
          <p className="text-olive-dark/70">Track and manage all payment transactions.</p>
          <div className="h-1 w-20 bg-gradient-to-r from-olive to-olive-light rounded-full mt-4"></div>
        </div>
        
        <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2">
          <Card className="border border-olive/20 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-olive/10 to-olive-light/10 border-b border-olive/10 pb-2">
              <CardTitle className="text-olive-dark">Total Revenue</CardTitle>
              <CardDescription className="text-olive-dark/70">Successful payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive-dark">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="border border-olive/20 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-olive/10 to-olive-light/10 border-b border-olive/10 pb-2">
              <CardTitle className="text-olive-dark">Pending Payments</CardTitle>
              <CardDescription className="text-olive-dark/70">Yet to be collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive-dark">${pendingAmount.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-xl shadow-md border border-olive/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-olive/5 border-b border-olive/10">
                <TableHead className="text-olive-dark/80">Payment ID</TableHead>
                <TableHead className="text-olive-dark/80">Guest</TableHead>
                <TableHead className="text-olive-dark/80">House</TableHead>
                <TableHead className="text-olive-dark/80">Amount</TableHead>
                <TableHead className="text-olive-dark/80">Payment Date</TableHead>
                <TableHead className="text-olive-dark/80">Method</TableHead>
                <TableHead className="text-olive-dark/80">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow className="border-olive/10">
                  <TableCell colSpan={7} className="text-center text-olive-dark/70">No payments found</TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id} className="border-olive/10 hover:bg-olive/5 transition-colors">
                    <TableCell className="font-mono text-sm text-olive-dark/80">{payment.id}</TableCell>
                    <TableCell className="text-olive-dark/80">{payment.guestName}</TableCell>
                    <TableCell className="text-olive-dark/80">{payment.houseName}</TableCell>
                    <TableCell className="text-olive-dark/80">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-olive-dark/80">{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-olive-dark/80">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="ml-2 capitalize">
                          {payment.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-olive-dark/80">{getPaymentStatusBadge(payment.status)}</TableCell>
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
