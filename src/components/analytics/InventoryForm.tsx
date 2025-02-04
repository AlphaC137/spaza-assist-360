import React from 'react';
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import type { InventoryItem } from '@/types/inventory';

interface InventoryForm {
  itemName: string;
  quantity: number;
  costPrice: number;
  sellPrice: number;
}

export const InventoryForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<InventoryForm>();
  const queryClient = useQueryClient();

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
  );
};