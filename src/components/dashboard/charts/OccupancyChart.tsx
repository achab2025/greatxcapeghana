
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OccupancyChartProps {
  data: Array<{ name: string; rate: number }>;
}

const OccupancyChart = ({ data }: OccupancyChartProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white h-full">
      <CardHeader>
        <CardTitle>Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(35, 39, 7, 0.8)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }} />
            <Line type="monotone" dataKey="rate" stroke="#B4E973" strokeWidth={2} dot={{ fill: "#B4E973" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
