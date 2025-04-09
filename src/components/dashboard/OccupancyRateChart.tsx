
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
    <Card className="border border-olive/20 shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
        <CardTitle className="text-olive-dark">Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-72 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" stroke="#4a5213" />
            <YAxis stroke="#4a5213" />
            <Tooltip contentStyle={{ backgroundColor: "white", color: "#4a5213", border: "1px solid rgba(74,82,19,0.2)" }} />
            <Line type="monotone" dataKey="rate" stroke="#5e6a13" strokeWidth={2} dot={{ fill: "#5e6a13" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyRateChart;
