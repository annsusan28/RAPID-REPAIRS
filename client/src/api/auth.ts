import { AxiosResponse } from 'axios';
import instance from '../config/axios';
import { ServiceProviderDetails } from '../types/types';

export const signup = (data: {
  name: string;
  email: string;
  password: string;
  userType: string;
}) => {
  return instance({
    method: 'POST',
    url: '/API/user',
    data: data,
  }).catch((error) => {
    console.log(error);
  });
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ token: string }>> => {
  const response = await instance({
    method: 'POST',
    url: '/API/user/login',
    data: data,
  });
  return response;
};

export const currentUser = async () => {
  const response = await instance.get('/API/user/current-user');
  return response;
};

export const updateServiceProvider = async (data: ServiceProviderDetails) => {
  const response = await instance({
    method: 'POST',
    url: '/API/user/update-service-provider/' + data.user_id,
    data: data,
  });
  return response;
};

export const updateCustomer = async (data: ServiceProviderDetails) => {
  const response = await instance({
    method: 'POST',
    url: '/API/user/update-customer/' + data.user_id,
    data: data,
  });
  return response;
};
