import API from "./api";

// 1. Fetch weekly reports with optional filters (center, medicine, week_start, etc.)
export const fetchWeeklyReports = async (params?: any) => {
  const res = await API.get("/weekly/reports/", { params });
  console.info("Weekly reports data");
  console.log(res.data.results);
  return res.data.results;
};

// 2. Create a new manual weekly report
export const createWeeklyReport = async (data: {
  center: number;
  medicine: number;
  week_start: string;
  week_end: string;
  quantity_used: number;
}) => {
  const res = await API.post("weekly/reports/", data);
  console.info("Created weekly report");
  console.log(res.data);
  return res.data;
};

// 3. Upload Weekly Report via Excel file
export const uploadWeeklyReportExcel = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await API.post('/weekly-excel/reports/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
