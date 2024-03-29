import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import MobileDetailFineList from './MobileDetailFineList';
import { useGetMobileDetailList } from '@/queries/Detail/useGetMobileDetailList';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { SelectedEventInfo } from '@/types/event';
import FilterBottomSheet from '../BottomSheet/FilterBottomSheet';

import * as Style from './styles';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import MobileFilterController from './MobileFilterController';
import MobileDateController from './MobileDateController';
import MobileAllCheckbox from './MobileAllCheckbox';
import { ARROW } from '@/assets/icons/Arrow';
import MobileToolbar from './MobileToolbar';
import useCheckListState from '@/hooks/useCheckListState';
import { SYSTEM } from '@/assets/icons/System';
import { useGroupDetail } from '@/queries/Group';
import useLockScroll from '@/hooks/useLockScroll';
import { searchMemberState } from '@/store/searchMemberState';
import { lockScrollState, initialLockScrollState } from '@/store/lockScrollState';

type GroupedData = {
  [key: string]: SelectedEventInfo[];
};

type Props = {
  $isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileDetailFine = ({ $isOpen, setIsOpen }: Props) => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const { ref, inView } = useInView();

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  const [searchMember, setSearchMember] = useRecoilState(searchMemberState);

  const [lockList, setLockList] = useRecoilState(lockScrollState);

  const [openFilterSheet, setOpenFilterSheet] = useState(false);

  useLockScroll(openFilterSheet, 'openFilterSheet');

  // isOpen으로 상세내역을 View 형태로 전환하고 그 뒤 Filter를 걸고 해제해서 document  스타일을 지울 수가 있어서 isOpen이  더 하위에 배치되었다.

  useLockScroll($isOpen, 'isOpen');

  const [GroupedListByDate, setGroupedListByDate] = useState({});

  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  const {
    checkedSize,
    checkDetailFineValues,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  const handleOpenFilterSheet = () => {
    setOpenFilterSheet((prev) => !prev);
  };

  const { data, hasNextPage, fetchNextPage } = useGetMobileDetailList(detailFilter, calendarDate);

  const details = (Object.values(GroupedListByDate).flat() as SelectedEventInfo[]) ?? [];

  const moveToCalendar = () => {
    setCalendarDate({
      startDate: dayjs(), //
      endDate: dayjs(),
      baseDate: dayjs(),
      mode: 'day',
    });
    navigate(`/m-group/${groupId}/book`);
  };

  const getSumOfDetails = checkDetailFineValues.reduce((result, { amount }) => (result += amount), 0);

  useEffect(() => {
    return () => {
      setLockList(initialLockScrollState);
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    setGroupedListByDate({});
  }, [calendarDate]);

  useEffect(() => {
    setDetailFilter((prev) => ({ ...prev, nickname: searchMember.nickname }));
  }, [searchMember]);

  //Todo: 그룹 이동 시 초기화 하도록 수정해애ㅑ 함
  useEffect(() => {
    // setSearchMember({ nickname: '' });
    setDetailFilter((prev) => ({ ...prev, groupId: Number(groupId) }));
  }, [groupId]);

  useEffect(() => {
    const groupedData: GroupedData = data?.pages.reduce((groups: any, page) => {
      page.content.eventList.forEach((item) => {
        const date = item.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
      });
      return groups;
    }, {});

    setGroupedListByDate((prev) => ({ ...groupedData }));
  }, [data, calendarDate, detailFilter]);

  useEffect(() => {
    setInitCheckDetailFine();
  }, [$isOpen]);

  const goToCreateFineBook = () => {
    navigate(`/m-group/${groupId}/create-finebook`);
    // 내역 추가 페이지로 라우팅
  };

  return (
    <Style.MobileDetailFineFrame $isOpen={$isOpen}>
      <Style.MobileDetailFineHeader>
        <Style.ArrowButton onClick={() => setIsOpen(false)}>{ARROW.DOWN_LG_GRAY}</Style.ArrowButton>
        <MobileDateController />
        <MobileFilterController openFilterSheet={handleOpenFilterSheet} />
        <MobileAllCheckbox //
          details={details}
          totalAmount={getSumOfDetails}
        />
      </Style.MobileDetailFineHeader>
      <MobileDetailFineList details={GroupedListByDate} inViewElement={ref} />
      {openFilterSheet && (
        <FilterBottomSheet //
          detailFilter={detailFilter}
          setDetailFilter={setDetailFilter}
          onClose={handleOpenFilterSheet}
        />
      )}
      {checkedSize > 0 && <MobileToolbar />}
      {!openFilterSheet && isAdmin && <Style.AddIconWrapper onClick={goToCreateFineBook}>{SYSTEM.PLUS_WHITE}</Style.AddIconWrapper>}
    </Style.MobileDetailFineFrame>
  );
};

export default MobileDetailFine;
