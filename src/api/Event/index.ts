import { SelectedEventInfo, Situation } from '@/types/event';
import { EvnetId, MonthStatus, EventInfoTest, EventInfoListTest } from '@/types/event';
import { GroupId } from '@/types/group';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';

export const createEvent = async (detailInfo: Omit<EventInfoTest, 'eventId'>): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.post('/api/event/penalty', detailInfo);
  return data;
};

export const getOneOfEvent = async (eventId?: number): Promise<ServerResponse<SelectedEventInfo>> => {
  const { data } = await api.get(`/api/event/penalty/${eventId}`);
  return data;
};

export const getDetailList = async (query: string): Promise<ServerResponse<EventInfoListTest>> => {
  const { data } = await api.get(`/api/event/penalties?${query}`);
  return data;
};
interface MobileType {
  startDate: string;
  endDate: string;
  groupId: number;
  nickname: string;
  situation: '' | Situation;
  page: number;
  size: number;
}

export const getMobileDetailList = async (query: Partial<MobileType>): Promise<ServerResponse<EventInfoListTest>> => {
  const { data } = await api.get(`/api/event/penalties`, {
    // get요청할 때, 객체를 넣으면 query로 변환해준다.
    params: query,
  });
  return data;
};

export const getDetailListById = async (eventIds: { groupId?: number; eventIdsList: number[] }): Promise<ServerResponse<EventInfoListTest>> => {
  const { groupId, eventIdsList } = eventIds;

  const { data } = await api.get(`api/events?groupId=${groupId}&eventIdList=${eventIdsList}`);
  return data;
};

export const updateEvent = async (info: SelectedEventInfo): Promise<ServerResponse<EventInfoTest>> => {
  const { eventId, ...detailInfo } = info;
  const { data } = await api.patch(`/api/event/penalty/${eventId}`, detailInfo);
  return data;
};

export const deleteEvent = async (eventId: number): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.delete(`/api/event/penalty/${eventId}`);
  return data;
};

export const updateEventStatus = async (info: { eventIdList: number[]; situation: Situation }): Promise<ServerResponse<{ eventIdList: number[]; situation: Situation }>> => {
  const { data } = await api.patch(`/api/event/penalty`, { ...info });
  return data;
};

export const getMonthStatus = async (groupId: string | undefined, startDate: string, endDate: string): Promise<ServerResponse<MonthStatus>> => {
  const { data } = await api.get(`/api/event/penalty/calendar/?groupId=${groupId}&startDate=${startDate}&endDate=${endDate}`);
  return data;
};
