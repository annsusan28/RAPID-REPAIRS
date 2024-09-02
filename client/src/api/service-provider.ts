import { AxiosResponse } from "axios";
import instance from "../config/axios";
import { ServiceJob, FeedbackWithCustomerDetails } from "../types/types";

export const getUserById = async (id: string) => {
  const response = await instance({
    method: "GET",
    url: "/api/user/service-details/" + id,
  });
  return response;
};

export const updateJobStatus = async (id: string) => {
  const response = await instance({
    method: "GET",
    url: "/api/job/complete/" + id,
  });
  return response;
};

export const getJobs = async (): Promise<AxiosResponse<ServiceJob[]>> => {
  const response = await instance({
    method: "GET",
    url: "/api/job/my-jobs",
  });
  return response;
};

export const getFeedback = async (): Promise<
  AxiosResponse<FeedbackWithCustomerDetails[]>
> => {
  const response = await instance({
    method: "GET",
    url: "/api/feedback/get-my-feedback",
  });
  return response;
};

export const updateLocationSP = async (data: {
  latitude: string;
  longitude: string;
}) => {
  const response = await instance({
    method: "POST",
    url: "/api/user/update-provider-location",
    data,
  });
  return response;
};
