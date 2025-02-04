import React from 'react';
import { InventoryForm } from '@/components/analytics/InventoryForm';
import { InventoryTable } from '@/components/analytics/InventoryTable';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Store Analytics</h1>
      <InventoryForm />
      <InventoryTable />
      <AnalyticsCharts />
    </div>
  );
};

export default Analytics;