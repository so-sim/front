import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from '..';
import * as Style from './styles';
import { FilterModeTest, useDateFilter } from '@/components/DetailFine/DateController/hook/useDateFilter';
import { dateState } from '@/store/dateState';
import { useRecoilState } from 'recoil';
import { Situation } from '@/types/event';
import { DetailFilter } from '@/store/detailFilter';
import dayjs from 'dayjs';
import { SYSTEM } from '@/assets/icons/System';
import MobileMiniCalendar from '@/m-components/MobileMiniCalendar';
import { dateToUnixTime } from '@/utils/handleDate';

const dateFilterModeList = [
  { mode: 'month', text: '월간' },
  { mode: 'week', text: '주간' },
  { mode: 'day', text: '일간' },
  { mode: 'custom', text: '상세' },
];

const situationFilterList = [
  { value: '미납', text: '납부 전' },
  { value: '완납', text: '납부완료' },
  { value: '확인중', text: '승인대기' },
];

type Props = {
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  onClose: () => void;
};

const FilterBottomSheet = ({ detailFilter, setDetailFilter, onClose }: Props) => {
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  const { changeDateByButtonMode, changeDateByCustomMode, currentWeek, initializeFilter } = useDateFilter();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateType, setDateType] = useState<'START_DATE' | 'END_DATE' | ''>('');

  const handleDateFilterMode = (buttonMode: FilterModeTest) => {
    if (calendarDate.mode === buttonMode) return;
    if (buttonMode === 'custom') {
      const today = dayjs();
      return changeDateByCustomMode({ endDate: today });
    }
    changeDateByButtonMode(buttonMode);
  };

  const handleCalednar = () => {
    setOpenCalendar((prev) => !prev);
  };

  const updateSituationFilter = (situation: Situation) => {
    const isSameSituationFilter = detailFilter.situation === situation;

    setDetailFilter((prev) => ({ ...prev, situation: isSameSituationFilter ? '' : situation }));
  };

  const handleDate = (date: string) => {
    if (dateType === 'START_DATE') {
      return setCalendarDate((prev) => ({ ...prev, startDate: dayjs(date) }));
    }
    if (dateType === 'END_DATE') {
      return setCalendarDate((prev) => ({ ...prev, endDate: dayjs(date) }));
    }
  };

  const isInvalidStartDate = (date: string) => {
    return dateToUnixTime(dayjs(date)) > dateToUnixTime(dayjs(calendarDate.endDate));
  };

  const isInvalidEndDate = (date: string) => {
    return dateToUnixTime(dayjs(date)) < dateToUnixTime(dayjs(calendarDate.startDate));
  };

  const isInvalidDate = (date: string) => {
    if (dateType === 'START_DATE') {
      return isInvalidStartDate(date);
    }
    if (dateType === 'END_DATE') {
      return isInvalidEndDate(date);
    }
    return true;
  };

  const isCustomMode = calendarDate.mode === 'custom';

  return (
    <>
      <BottomSheet onClose={onClose} title="필터" left={{ icon: SYSTEM.INITIALIZATION, onClick: initializeFilter }}>
        <div>
          <Style.Title>기간</Style.Title>
          <Style.Row>
            {dateFilterModeList.map(({ mode, text }) => {
              return (
                <Style.FilterButton
                  key={mode}
                  isSelected={mode === calendarDate.mode}
                  onClick={() => {
                    handleDateFilterMode(mode as FilterModeTest);
                  }}
                >
                  {text}
                </Style.FilterButton>
              );
            })}
          </Style.Row>
          <Style.SubRow>
            {isCustomMode && (
              <>
                <Style.CustomDateBox
                  onClick={() => {
                    setDateType('START_DATE');
                    setOpenCalendar(true);
                  }}
                >
                  <Style.CustomTitle>시작일</Style.CustomTitle>
                  <Style.DateBox>{dayjs(calendarDate.startDate).format('YYYY.MM.DD')}</Style.DateBox>
                </Style.CustomDateBox>
                <div>-</div>
                <Style.CustomDateBox
                  onClick={() => {
                    setDateType('END_DATE');
                    setOpenCalendar(true);
                  }}
                >
                  <Style.CustomTitle>종료일</Style.CustomTitle>
                  <Style.DateBox>{dayjs(calendarDate.endDate).format('YYYY.MM.DD')}</Style.DateBox>
                </Style.CustomDateBox>
              </>
            )}
          </Style.SubRow>
        </div>
        <div>
          <Style.Title>납부여부</Style.Title>
          <Style.Row>
            {situationFilterList.map(({ value, text }) => {
              return (
                <Style.FilterButton //
                  key={value}
                  isSelected={value === detailFilter.situation}
                  onClick={() => updateSituationFilter(value as Situation)}
                >
                  {text}
                </Style.FilterButton>
              );
            })}
          </Style.Row>
        </div>
        <div style={{ height: '106px' }} />
      </BottomSheet>
      {Boolean(dateType) && openCalendar && (
        <MobileMiniCalendar //
          date={dayjs(calendarDate.startDate).format('YYYY-MM-DD')}
          onChangeDate={handleDate}
          onClose={handleCalednar}
          isInvalidDate={isInvalidDate}
        />
      )}
    </>
  );
};

export default FilterBottomSheet;
