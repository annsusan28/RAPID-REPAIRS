import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import {
  GenericAxiosResponse,
  UseGenericMutationOptions,
  UseGenericMutationResult,
} from '../types/types';

export function useGenericMutation<TData, TError = unknown, TVariables = void>(
  mutationFn: (variables: TVariables) => GenericAxiosResponse<TData>,
  options?: UseGenericMutationOptions<TData, TError, TVariables>
): UseGenericMutationResult<TData, TError, TVariables> {
  return useMutation<AxiosResponse<TData>, TError, TVariables>(
    mutationFn,
    options
  );
}
