
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OccupancyRateChartProps {
  data: Array<{
    name: string;
    rate: number;
  }>;
}

const OccupancyRateChart = ({ data }: OccupancyRateChartProps) => {
  return (
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-slate-200">
        <CardTitle className="text-emerald-700">Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-72 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: "white", color: "#000", border: "1px solid rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyRateChart;
