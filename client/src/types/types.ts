import { AxiosResponse } from "axios";
import { UseMutationOptions, UseMutationResult } from "react-query";

// Define a generic type for the Axios response
export type GenericAxiosResponse<T> = Promise<AxiosResponse<T>>;

// Define a generic type for useMutation
export type UseGenericMutationOptions<TData, TError, TVariables> = Omit<
  UseMutationOptions<AxiosResponse<TData>, TError, TVariables>,
  "mutationFn"
>;

export type UseGenericMutationResult<TData, TError, TVariables> =
  UseMutationResult<AxiosResponse<TData>, TError, TVariables>;

export interface User {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  status: string;
  userType: string;
}

export interface ServiceProviderDetails {
  user_id: number;
  name?: string;
  email: string;
  role?: string;
  years_of_experience?: number;
  birth_date?: string;
  city?: string;
  qualification?: string;
  district?: string;
  phone_no?: string;
  service_type?: string;
  phone?: string;
  status?: "active" | "inactive";
  latitude?: string;
  longitude?: string;
}

type JobStatus = "draft" | "booked" | "complete";
type ServiceType =
  | "plumbing"
  | "electrical"
  | "carpentry"
  | "cleaning"
  | "roofing"
  | "painting";

export interface Job {
  job_id?: number;
  title: string;
  description: string;
  status?: JobStatus;
  service_type: ServiceType;
  assigned_to_user?: number | null;
  created_by_user?: number | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ServiceJob extends Job {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
}

export interface CustomerJob extends Job {
  service_provider_name: string;
  service_provider_email: string;
  service_provider_phone: string;
  service_provider_city: string;
  service_provider_district: string;
  service_provider_latitude: string;
  service_provider_longitude: string;
}

export type NearbyProviderDetails = {
  service_provider_id: number;
  user_id: number;
  name: string;
  email: string;
  role: string;
  service_type:
    | "plumbing"
    | "electrical"
    | "carpentry"
    | "cleaning"
    | "roofing"
    | "painting";
  years_of_experience: number;
  birth_date: string;
  city: string;
  qualification: string;
  district: string;
  phone_no: string;
  latitude: string;
  longitude: string;
  status: "active" | "inactive";
  average_rating: string;
};

export interface ErrorResponse {
  response?: {
    data: {
      error: string;
    };
  };
  message?: string;
}

export type FeedbackWithCustomerDetails = {
  feedback_id: number;
  job_id: number;
  service_provider_id: number;
  customer_id: number;
  feedback: string;
  star_rating: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
};
