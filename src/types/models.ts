import exp from "constants";

export interface Center {
  id: number;
  name: string;
}

export interface Medicine {
  id: number;
  name: string;
}

export interface Stock {
  id: number;
  center: number;
  center_name: string;
  medicine: number;
  medicine_name: string;
  total_quantity: number;
  last_updated: string;
}


export interface Receipt {
  id: number;
  center_name: string;
  medicine: number;
  medicine_name: string;
  unit: string;
  quantity__received: number;
  expiration_date: string;
  received__date: string;
}

