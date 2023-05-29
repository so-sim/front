import { updateEventStatus } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ServerPaymentType } from '@/types/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetailStatus = (onSuccessUpdate?: (data: ServerPaymentType) => void) => {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
      onSuccessUpdate && onSuccessUpdate(data.content.paymentType);
    },
  });
};
