import { currentUser } from '../api/auth';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useGenericMutation } from './useMutation';
import { User } from '../types/types';

export const useCurrentUser = () => {
  const { setAuthenticated, setLoading, setUserData } = useAuthStore(
    (state) => state
  );
  const { mutate, data } = useGenericMutation<User>(currentUser, {
    onSuccess: (data) => {
      setAuthenticated(true);
      setLoading(false);
      if (data.data) {
        setUserData(data.data);
      }
    },
    onError: (error) => {
      setAuthenticated(false);
      setLoading(false);
      console.log(error);
      localStorage.removeItem('token');
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return data;
};
