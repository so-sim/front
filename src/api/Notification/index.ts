import api from '..';
import { ServerResponse } from '@/types/serverResponse';
import { NotificationListWithIndex } from '@/types/notification';

export const reqNotifications = async (eventIdList: number[]): Promise<ServerResponse> => {
  const { data } = await api.post('/api/pay-notifications', { eventIdList });
  return data;
};

export const getNotificationList = async (page: number, size: number): Promise<ServerResponse<NotificationListWithIndex>> => {
  const { data } = await api.get(`/api/notification?page=${page}&size=${size}`);

  return data;
};

export const readAllNotification = async (): Promise<ServerResponse> => {
  const { data } = await api.patch('/api/notification');
  return data;
};

export const readNotification = async (notificationId: number): Promise<ServerResponse> => {
  const { data } = await api.patch(`/api/notification/${notificationId}`);
  return data;
};

export const getNotificationListCount = async (): Promise<ServerResponse<{ count: number }>> => {
  const { data } = await api.get(`/api/notification/count`);

  return data;
};
