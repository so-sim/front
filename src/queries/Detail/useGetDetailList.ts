import { getDetailList } from '@/api/Event';
// import { DetailFilter } from '@/utils/dateFilter/dateFilter';

import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { detailFilterToQuery } from '@/utils/detailFilterToQuery';
import { DetailFilter } from '@/store/detailFilter';
import { DateState } from '@/store/dateState';

export const useGetDetailList = (detailFilter: Partial<DetailFilter>, calendarDate: DateState) => {
  const query = detailFilterToQuery({ ...detailFilter, startDate: dayjs(calendarDate.startDate).format('YYYY.MM.DD'), endDate: dayjs(calendarDate.endDate).format('YYYY.MM.DD') });

  return useQuery(['detailList', query, calendarDate], () => getDetailList(query), { enabled: !!query });
};
