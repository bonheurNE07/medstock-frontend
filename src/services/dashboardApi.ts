import API from "./api";

export const fetchDashboardData = async () => {
  const res = await API.get("/dashboard/");
  console.log(res.data)
  return res.data;
};
