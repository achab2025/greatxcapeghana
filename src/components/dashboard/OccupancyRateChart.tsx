
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
    <Card className="border shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle>Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" stroke="rgba(0,0,0,0.7)" />
            <YAxis stroke="rgba(0,0,0,0.7)" />
            <Tooltip contentStyle={{ backgroundColor: "white", color: "#000", border: "1px solid rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="rate" stroke="#5e6a13" strokeWidth={2} dot={{ fill: "#5e6a13" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyRateChart;
