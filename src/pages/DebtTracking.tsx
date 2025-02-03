import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Bell, DollarSign } from "lucide-react";

const DebtTracking = () => {
  // Mock data for demonstration - replace with actual data from Supabase
  const debtors = [
    {
      id: 1,
      name: "Sipho",
      amount: 200,
      dueDate: "Friday",
      status: "pending"
    },
    {
      id: 2,
      name: "Themba",
      amount: 150,
      dueDate: "Monday",
      status: "overdue"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Customer Credit Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-4 bg-yellow-50">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Risk Alerts</h3>
          </div>
          <p className="mt-2 text-sm text-yellow-700">
            2 customers have overdue payments
          </p>
        </Card>
        
        <Card className="p-4 bg-blue-50">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Total Outstanding</h3>
          </div>
          <p className="mt-2 text-sm text-blue-700">
            R350 in pending payments
          </p>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Customer Credit Log</h2>
        <Table>
          <TableCaption>List of customers with outstanding payments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Amount (R)</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debtors.map((debtor) => (
              <TableRow key={debtor.id} className={debtor.status === 'overdue' ? 'bg-red-50' : ''}>
                <TableCell className="font-medium">{debtor.name}</TableCell>
                <TableCell>R{debtor.amount}</TableCell>
                <TableCell>{debtor.dueDate}</TableCell>
                <TableCell className={`capitalize ${
                  debtor.status === 'overdue' ? 'text-red-600 font-medium' : ''
                }`}>
                  {debtor.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DebtTracking;