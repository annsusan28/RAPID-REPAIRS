import { AxiosResponse } from 'axios';
import instance from '../config/axios';
import { ServiceProviderDetails } from '../types/types';

export const getAllServiceProviders = async (): Promise<
  AxiosResponse<ServiceProviderDetails[], unknown>
> => {
  const response = await instance({
    method: 'GET',
    url: '/api/user/service-providers',
  });
  return response;
};

export const updateVerification = async (data: {
  id: string;
  status: 'active' | 'inactive';
}): Promise<AxiosResponse<{ status: string }>> => {
  const response = await instance({
    method: 'POST',
    url: '/api/user/update-service-provider-status',
    data: {
      userId: data.id,
      status: data.status,
    },
  });
  return response;
};
