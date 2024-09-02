import { AxiosResponse } from "axios";
import instance from "../config/axios";
import { CustomerJob } from "../types/types";

export const postFeedback = async (data: {
  feedback: string;
  star_rating: number;
  service_provider_id: string;
  job_id: string;
  token: string;
}) => {
  const response = await instance({
    method: "POST",
    url: "/api/feedback/add-feedback",
    data,
  });
  return response;
};

export const getJobs = async (): Promise<AxiosResponse<CustomerJob[]>> => {
  const response = await instance({
    method: "GET",
    url: "/api/job/my-jobs",
  });
  return response;
};
