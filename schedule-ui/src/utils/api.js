import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // todo: move to "env"
  headers: {
    "Cache-Control": "no-cache, no-store",
    Pragma: "no-cache",
  },
  withCredentials: true,
});

axiosInstance.createJob = async ({ jobType, jobRule }) => {
  const res = await axiosInstance.post("/jobs/", {
    type: jobType,
    rule: jobRule,
  });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }

  return Promise.resolve(res.data.data);
};

axiosInstance.getScheduledJobs = async () => {
  const res = await axiosInstance.get("/jobs/");
  return res.data.data;
};

axiosInstance.removeJob = async (jobId) => {
  const res = await axiosInstance.delete(`/jobs/${jobId}/`);
  return res.data.data;
};

export default axiosInstance;
