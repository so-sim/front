import { TOAST_ERROR } from './../../constants/Toast';
import { createEvent } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.CREATE_FINE });
    },
  });
};
