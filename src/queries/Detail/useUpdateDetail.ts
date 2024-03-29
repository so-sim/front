import { updateEvent } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEvent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
    },
  });
};
