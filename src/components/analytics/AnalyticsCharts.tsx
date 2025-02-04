import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { VoiceCashFlow } from '@/components/VoiceCashFlow';
import { Skeleton } from "@/components/ui/skeleton";

const monthlyData = [
  { name: 'Jan', profit: 4000, sales: 2400 },
  { name: 'Feb', profit: 3000, sales: 1398 },
  { name: 'Mar', profit: 2000, sales: 9800 },
  { name: 'Apr', profit: 2780, sales: 3908 },
  { name: 'May', profit: 1890, sales: 4800 },
  { name: 'Jun', profit: 2390, sales: 3800 },
];

interface ChartCardProps {
  title: string;
  children: React.ReactElement;
  isLoading?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, isLoading }) => (
  <Card className="p-4">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {isLoading ? (
      <div className="h-[300px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    ) : (
      <ChartContainer config={{}} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </ChartContainer>
    )}
  </Card>
);

export const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VoiceCashFlow />
      
      <ChartCard title="Monthly Profit Overview">
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="profit" 
            stroke="#8884d8" 
            name="Profit (R)"
          />
        </LineChart>
      </ChartCard>

      <ChartCard title="Monthly Sales Analysis">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="sales" 
            fill="#82ca9d" 
            name="Sales (R)"
          />
        </BarChart>
      </ChartCard>
    </div>
  );
};