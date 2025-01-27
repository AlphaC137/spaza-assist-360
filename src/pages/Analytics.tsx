import React, { useState } from 'react';
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
import { ChartContainer } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for charts
const monthlyData = [
  { name: 'Jan', profit: 4000, sales: 2400 },
  { name: 'Feb', profit: 3000, sales: 1398 },
  { name: 'Mar', profit: 2000, sales: 9800 },
  { name: 'Apr', profit: 2780, sales: 3908 },
  { name: 'May', profit: 1890, sales: 4800 },
  { name: 'Jun', profit: 2390, sales: 3800 },
];

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
}

interface InventoryForm {
  itemName: string;
  quantity: number;
  costPrice: number;
  sellPrice: number;
}

const Analytics = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<InventoryForm>();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([
    { id: 1, name: "Bread", quantity: 45, costPrice: 15.00, sellingPrice: 18.00 },
    { id: 2, name: "Milk", quantity: 30, costPrice: 20.00, sellingPrice: 25.00 },
    { id: 3, name: "Sugar", quantity: 100, costPrice: 18.00, sellingPrice: 22.00 },
    { id: 4, name: "Rice", quantity: 50, costPrice: 45.00, sellingPrice: 55.00 },
    { id: 5, name: "Cooking Oil", quantity: 25, costPrice: 35.00, sellingPrice: 42.00 },
  ]);

  const onSubmit = (data: InventoryForm) => {
    // Create new inventory item
    const newItem: InventoryItem = {
      id: inventoryData.length + 1,
      name: data.itemName,
      quantity: Number(data.quantity),
      costPrice: Number(data.costPrice),
      sellingPrice: Number(data.sellPrice),
    };

    // Add new item to inventory
    setInventoryData(prev => [...prev, newItem]);

    // Show success toast
    toast({
      title: "Inventory Updated",
      description: `Added ${data.quantity} ${data.itemName}(s) to inventory`,
    });

    // Reset form
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

      {/* Current Inventory Table */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Current Inventory</h2>
        <Table>
          <TableCaption>A list of your current inventory items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Cost Price (R)</TableHead>
              <TableHead>Selling Price (R)</TableHead>
              <TableHead>Potential Profit (R)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.costPrice.toFixed(2)}</TableCell>
                <TableCell>{item.sellingPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {((item.sellingPrice - item.costPrice) * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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