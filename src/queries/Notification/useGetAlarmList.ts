import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotificationList } from '@/api/Notification';

export const useGetAlarmList = (page: number, size: number) => {
  return useInfiniteQuery(['alarmList', page, size], ({ pageParam = 0 }) => getNotificationList(pageParam, size), {
    getNextPageParam: (lastPage, allPage) => (lastPage.content.hasNext ? lastPage.nextPage : undefined),
  });
};

// 나중에 형식을 확인하면서 변경예정
