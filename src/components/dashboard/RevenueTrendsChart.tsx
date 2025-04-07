
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
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
        <CardTitle className="text-blue-700">Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-80 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: "white", color: "#000", border: "1px solid rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} dot={{ fill: "#4f46e5" }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueTrendsChart;
