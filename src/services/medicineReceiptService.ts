import API from "./api";

export const createMedicineReceipt = async (data: {
  center: number;
  medicine: number;
  quantity_received: number;
  exp_date: string;
  received_date: string;
}) => {
  console.log(data);
  const response = await API.post("/receipts/", data);
  return response.data;
};
