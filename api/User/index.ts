import { WithDrawl } from './../../types/user.d';
import { ServerResponse } from '@/types/serverResponse';
import { UserInfo } from '@/types/user';
import api from '..';

export const getUserInfo = async (userId: number): Promise<ServerResponse<UserInfo>> => {
  const { data } = await api.get(`/api/user/${userId}`);
  return data;
};

export const withDrawal = async (withdrawal: WithDrawl): Promise<ServerResponse> => {
  const { data } = await api.put(`/api/user/${withdrawal.userId}`, withdrawal);
  return data;
};