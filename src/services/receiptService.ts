import API from "./api";

export const fetchReceipts = async (params?: any) => {
  const res = await API.get("/receipts/", { params });
  return res.data; // Full response
};

export const uploadReceiptExcel = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await API.post('/receipts-excel/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};