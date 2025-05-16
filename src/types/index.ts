export interface MedicineStock {
  id: number;
  medicine_name: string;
  center_name: string;
  quantity_received: number;
  quantity_dispensed: number;
  date_received: string;
}

export interface CreateStockForm {
  medicine_id: number;
  center_id: number;
  quantity_received: number;
  quantity_dispensed: number;
  date_received: string;
}

export interface StockAlert {
  medicine_name: string;
  center_name: string;
  remaining_quantity: number;
}

export interface Center {
  id: number;
  name: string;
}

export interface Medicine {
  id: number;
  name: string;
}
