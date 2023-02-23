import { getGroupList } from './../../api/Group/index';
import { useQuery } from '@tanstack/react-query';

const useGroupListQuery = () => {
  return useQuery(['groups'], getGroupList);
};

export default useGroupListQuery;
