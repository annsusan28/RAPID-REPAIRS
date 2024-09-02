import instance from "../config/axios";

export const getNearbyJobs = async (data: {
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  serviceType: string;
}) => {
  const response = await instance({
    method: "POST",
    url: "/api/job/nearby",
    data,
  });
  return response;
};

export const addJob = async (data: {
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  service_type: string;
  assigned_to_user: string;
  created_by_user: string;
}) => {
  const response = await instance({
    method: "POST",
    url: "/api/job",
    data,
  });
  return response;
};
