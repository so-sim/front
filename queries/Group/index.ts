export { useUpdateGroup } from './useUpdateGroup';
export { useParticipantList } from './useParticipantList';
export { useJoinGroup } from './useJoinGroup';
export { useGroupList } from './useGroupList';
export { useGroupDetail } from './useGroupDetail';
export { useCreateGroup } from './useCreateGroup';
export { useChangeNickname } from './useChangeNickname';
export { useChangeAdmin } from './useChangeAdmin';
export { useDeleteGroup } from './useDeleteGroup';
export { useWithdrawalGroup } from './useWithdrawalGroup';
import { ServerResponse } from '@/types/serverResponse';

export const message = {
  onSuccess: (data: ServerResponse<any>) => console.log(data.status),
};