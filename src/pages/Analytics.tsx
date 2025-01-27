import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

// Mock data - in a real app this would come from your backend
const monthlyData = [
  { name: 'Jan', profit: 4000, sales: 2400 },
  { name: 'Feb', profit: 3000, sales: 1398 },
  { name: 'Mar', profit: 2000, sales: 9800 },
  { name: 'Apr', profit: 2780, sales: 3908 },
  { name: 'May', profit: 1890, sales: 4800 },
  { name: 'Jun', profit: 2390, sales: 3800 },
];

interface InventoryForm {
  itemName: string;
  quantity: number;
  costPrice: number;
  sellPrice: number;
}

const Analytics = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<InventoryForm>();

  const onSubmit = (data: InventoryForm) => {
    console.log(data);
    toast({
      title: "Inventory Updated",
      description: `Added ${data.quantity} ${data.itemName}(s) to inventory`,
    });
    reset();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Store Analytics</h1>
      
      {/* Add New Inventory Form */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Add New Inventory</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="itemName">Item Name</label>
              <Input {...register("itemName")} placeholder="Enter item name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity">Quantity</label>
              <Input 
                {...register("quantity")} 
                type="number" 
                placeholder="Enter quantity" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="costPrice">Cost Price (R)</label>
              <Input 
                {...register("costPrice")} 
                type="number" 
                step="0.01" 
                placeholder="Enter cost price" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sellPrice">Selling Price (R)</label>
              <Input 
                {...register("sellPrice")} 
                type="number" 
                step="0.01" 
                placeholder="Enter selling price" 
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Add Item</Button>
        </form>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Profit Overview</h2>
          <ChartContainer config={{}} className="h-[300px]">
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
          </ChartContainer>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales Analysis</h2>
          <ChartContainer config={{}} className="h-[300px]">
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
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;