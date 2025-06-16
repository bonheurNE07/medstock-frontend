import axios from "axios";
import { Stock, Receipt, Center } from "../types/models";

const API = axios.create({
  // baseURL: "https://medstock-backend-mdts.onrender.com/api",
  baseURL: "http://127.0.0.1:8000/api", 
  // baseURL : "https://891a-2c0f-eb68-6b7-1f00-2946-9fc2-a6b7-51ef.ngrok-free.app/api",
  // baseURL : "http://100.86.174.80:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all centers
export const fetchCenters = async (): Promise<Center[]> => {
  const res = await API.get("/centers/");
  return res.data;
};

// Fetch stock by center + medicine search
export const fetchStock = async (centerId?: number, search?: string): Promise<Stock[]> => {
  const params: any = {};
  if (centerId) params.center = centerId;
  if (search) params["medicine__name__icontains"] = search;
  const res = await API.get("/stocks/", { params });
  return res.data;
};

// Fetch receipts by center, date range, and medicine search
export const fetchReceipts = async (
  centerId?: number,
  startDate?: string,
  endDate?: string,
  search?: string
): Promise<Receipt[]> => {
  const params: any = {};
  if (centerId) params.center = centerId;
  if (startDate) params["received_date__gte"] = startDate;
  if (endDate) params["received_date__lte"] = endDate;
  if (search) params["medicine__name__icontains"] = search;
  const res = await API.get("/receipts/", { params });
  return res.data;
};


export default API;

