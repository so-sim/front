import { QueryFunctionContext } from '@tanstack/react-query';
import api from '..';
import type { Group } from '../../types/Group';

export const getGroupData = async ({ queryKey }: QueryFunctionContext<[string, string | undefined]>): Promise<Group> => {
  const [, id] = queryKey;
  return await api.get(`/group?id=${id}`).then((res) => res.data);
};

export const getGroupList = async (): Promise<Group[]> => {
  return await api.get(`/groups`).then((res) => res.data);
};
