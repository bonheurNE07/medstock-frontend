import API from "./api";

export const fetchWeeklyReports = async () => {
  const res = await API.get("/weekly/reports/");
  return res.data;
};

export const exportWeeklyReport = async () => {
  const res = await API.get("/weekly/reports/export/", {
    responseType: "blob",
  });
  return res.data;
};

export const uploadExcelReceipts = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await API.post("/receipts/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
