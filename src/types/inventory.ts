export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  cost_price: number;
  selling_price: number;
  created_at?: string;
}