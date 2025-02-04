import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { InventoryForm } from '@/components/analytics/InventoryForm';
import { InventoryTable } from '@/components/analytics/InventoryTable';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';
import { Card } from '@/components/ui/card';

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Store Analytics</h1>
      <ErrorBoundary>
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
            <InventoryForm />
          </Card>
          
          <ErrorBoundary>
            <InventoryTable />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <AnalyticsCharts />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Analytics;