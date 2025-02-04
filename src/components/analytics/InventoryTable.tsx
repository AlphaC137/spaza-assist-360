import React from 'react';
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { InventoryItem } from '@/types/inventory';

export const InventoryTable = () => {
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

  return (
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
  );
};