import { useQuery } from '@tanstack/react-query';
import { getGroupData } from '../../api/Group';

const useGroupQuery = (id: string | undefined) => {
  return useQuery(['group', id], getGroupData, {
    enabled: !!id,
  });
};

export default useGroupQuery;
