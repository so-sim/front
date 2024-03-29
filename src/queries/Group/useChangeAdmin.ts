import { TOAST_SUCCESS } from '@/constants/Toast';
import { changeAdmin } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ServerResponse } from '@/types/serverResponse';
import { GroupDetail, GroupNickname, ParticipantList } from '@/types/group';
import { ToastPopUp } from '@/components/@common/Toast';

export const useChangeAdmin = (groupId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(changeAdmin, {
    onMutate: async (context) => {
      const { groupId, nickname } = context;
      await queryClient.cancelQueries(['participantList', groupId]);
      const prevParticipantList = queryClient.getQueryData<ServerResponse<ParticipantList>>(['participantList', groupId]);
      const prevGroupDetail = queryClient.getQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId]);
      const myNickname = queryClient.getQueryData<ServerResponse<GroupNickname>>(['myNickname', groupId]);

      if (prevParticipantList) {
        const newList = prevParticipantList.content.nicknameList.filter(
          (participantNickname) => participantNickname !== myNickname?.content.nickname && participantNickname !== nickname,
        );

        queryClient.setQueryData<ServerResponse<ParticipantList>>(['participantList', groupId], {
          ...prevParticipantList,
          content: {
            ...prevParticipantList.content,
            nicknameList: newList,
            adminNickname: nickname,
          },
        });
      }

      if (prevGroupDetail) {
        queryClient.setQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId], {
          ...prevGroupDetail,
          content: {
            ...prevGroupDetail.content,
            isAdmin: false,
          },
        });
      }

      return { prevParticipantList, prevGroupDetail };
    },
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_ADMIN });
    },
    onError: (error, value, context) => {
      if (context?.prevParticipantList) {
        queryClient.setQueryData(['participantList', value.groupId], context.prevParticipantList);
      }
      if (context?.prevGroupDetail) {
        queryClient.setQueryData(['groupDetail', value.groupId], context.prevGroupDetail);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['participantList', groupId]);
      queryClient.invalidateQueries(['groupDetail', groupId]);
    },
  });
};
