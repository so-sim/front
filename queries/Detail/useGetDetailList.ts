import { getEventList } from '@/api/Event';
import { DateQueryString } from '@/hooks/useQueryString';
import { useQuery } from '@tanstack/react-query';

export const useGetDetailList = (evnetFilter: DateQueryString) => {
  const queries = Object.entries(evnetFilter)
    .reduce((prev, curr) => `${prev}&${curr[0]}=${curr[1]}`, '')
    .slice(1) as string;
  console.log(queries);

  return useQuery(['detailList', queries], () => getEventList(queries));
};