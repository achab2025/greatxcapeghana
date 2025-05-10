
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Payment } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserPaymentsCardProps {
  userPayments: Payment[];
}

const UserPaymentsCard = ({ userPayments }: UserPaymentsCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border border-olive/20 shadow-md">
      <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
        <CardTitle className="text-olive-dark">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-olive/10">
              <TableHead className="text-olive-dark">Date</TableHead>
              <TableHead className="text-olive-dark">Amount</TableHead>
              <TableHead className="text-olive-dark">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPayments.map(payment => (
              <TableRow key={payment.id} className="border-olive/10">
                <TableCell className="py-2 text-olive-dark">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-2 text-olive-dark">${payment.amount.toFixed(2)}</TableCell>
                <TableCell className="py-2">
                  <Badge className={
                    payment.status === 'successful' ? 'bg-emerald-500' : 
                    payment.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                  }>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <Button 
            variant="ghost" 
            className="text-olive hover:bg-olive/10"
            onClick={() => navigate("/payments")}
          >
            View All Payments →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPaymentsCard;
