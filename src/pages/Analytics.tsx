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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { InventoryItem } from '@/types/inventory';

// Mock data for charts
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
  const queryClient = useQueryClient();

  // Fetch inventory data
  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as InventoryItem[];
    },
  });

  // Add new inventory item
  const addInventoryMutation = useMutation({
    mutationFn: async (newItem: Omit<InventoryItem, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('inventory')
        .insert([newItem])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      toast({
        title: "Success",
        description: "Item added to inventory",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add item to inventory",
        variant: "destructive",
      });
      console.error('Error adding item:', error);
    },
  });

  const onSubmit = (data: InventoryForm) => {
    addInventoryMutation.mutate({
      name: data.itemName,
      quantity: Number(data.quantity),
      cost_price: Number(data.costPrice),
      selling_price: Number(data.sellPrice),
    });
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
          <Button 
            type="submit" 
            className="w-full"
            disabled={addInventoryMutation.isPending}
          >
            {addInventoryMutation.isPending ? 'Adding...' : 'Add Item'}
          </Button>
        </form>
      </Card>

      {/* Current Inventory Table */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Current Inventory</h2>
        {isLoading ? (
          <div>Loading inventory...</div>
        ) : (
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
              {inventoryData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.cost_price.toFixed(2)}</TableCell>
                  <TableCell>{item.selling_price.toFixed(2)}</TableCell>
                  <TableCell>
                    {((item.selling_price - item.cost_price) * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
