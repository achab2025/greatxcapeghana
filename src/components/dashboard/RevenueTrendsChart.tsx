
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueTrendsChartProps {
  data: Array<{
    name: string;
    revenue: number;
  }>;
}

const RevenueTrendsChart = ({ data }: RevenueTrendsChartProps) => {
  return (
    <Card className="border border-olive/20 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
        <CardTitle className="text-olive-dark">Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-80 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" stroke="#4a5213" />
            <YAxis stroke="#4a5213" />
            <Tooltip contentStyle={{ backgroundColor: "white", color: "#4a5213", border: "1px solid rgba(74,82,19,0.2)" }} />
            <Line type="monotone" dataKey="revenue" stroke="#4a5213" strokeWidth={2} dot={{ fill: "#4a5213" }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueTrendsChart;
