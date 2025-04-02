
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track and manage all payment transactions.</p>
        </div>
        
        <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>Successful payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Yet to be collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${pendingAmount.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>House</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No payments found</TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                    <TableCell>{payment.guestName}</TableCell>
                    <TableCell>{payment.houseName}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="ml-2 capitalize">
                          {payment.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
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
