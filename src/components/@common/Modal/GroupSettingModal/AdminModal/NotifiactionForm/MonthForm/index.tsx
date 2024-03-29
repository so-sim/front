import { ARROW } from '@/assets/icons/Arrow';
import { DayType, NotificationInfo } from '@/types/group';
import { DuplicateValues } from '..';
import * as Style from './styles';
import DaySelector from '../DaySelector';
import { useState } from 'react';
import { DayOfWeek } from '@/queries/Group/useUpdateNotificationInfo';
import { sortNotificationForm } from '../../utils/sortNotificationInfo';
import { dayType, weekType } from '@/hooks/Group/useNotificationForm';

type Props<T, V> = {
  notificationForm: NotificationInfo;
  isErrorField: (field: keyof NotificationInfo) => boolean;
  handleDuplicateValues: <T extends DuplicateValues, V>(type: T, value: V) => void;
  handleNotificationForm: <T extends keyof NotificationInfo>(type: T, value: NotificationInfo[T]) => void;
  getOneLineNotificationDescription: (notificationInfo: NotificationInfo) => string;
};

const ORDINARY_LIST = [
  { label: '첫 번째', value: 1 },
  { label: '두 번째', value: 2 },
  { label: '세 번째', value: 3 },
  { label: '네 번째', value: 4 },
  { label: '다섯 번째', value: 5 },
  { label: '마지막', value: 6 },
];

const MonthForm = <T extends NotificationInfo, V extends T[DuplicateValues]>({
  notificationForm,
  getOneLineNotificationDescription,
  handleNotificationForm,
  handleDuplicateValues,
  isErrorField,
}: Props<T, V>) => {
  const createFixedCalendar = () => {
    const result = Array.from({ length: 5 }, () => [] as (number | null)[]);
    for (let i = 0; i < 35; i++) {
      result[Math.floor(i / 7)].push(i < 31 ? i + 1 : null);
    }
    return result;
  };

  const [ordinaryError, setOrdinaryError] = useState(false);

  const isOverTwoOrdinaryNumbers = () => {
    return (notificationForm.ordinalNumbers ?? []).length >= 2;
  };

  const setErrorMessageDuring = (time: number) => {
    setOrdinaryError(true);
    setTimeout(() => {
      setOrdinaryError(false);
    }, time);
  };

  const isDuplicateOrdinaryNumbers = (value: number) => {
    return (notificationForm.ordinalNumbers ?? []).includes(value);
  };

  const subtractDuplicateOrdinaryNumbers = (value: number) => {
    handleNotificationForm(
      'ordinalNumbers',
      (notificationForm.ordinalNumbers ?? []).filter((v) => v !== value),
    );
  };

  const addDuplicateOrdinaryNumbers = (value: number) => {
    handleNotificationForm('ordinalNumbers', [...(notificationForm.ordinalNumbers ?? []), value]);
  };

  const isSimpleDateType = notificationForm.monthSettingType === 'SIMPLE_DATE';
  const isSelectDayType = notificationForm.monthSettingType === 'WEEK';

  const sortedNotificationForm = sortNotificationForm(notificationForm);

  const description = ({ daysOfWeek, ordinalNumbers }: NotificationInfo) => {
    const mappedDaysOfWeek = daysOfWeek?.map((day) => dayType[day as DayType]);
    const mappedOrdinalNumbers = ordinalNumbers?.map((week) => weekType[week]);
    const dayString = mappedDaysOfWeek?.length === 0 ? '무슨' : mappedDaysOfWeek?.join(', ');
    const weekString = mappedOrdinalNumbers?.length === 0 ? '몇 번째' : mappedOrdinalNumbers?.join(', ');

    return `${weekString} ${dayString}요일`;
  };

  return (
    <>
      <Style.MonthlySelectTitle //
        isSelected={isSimpleDateType}
        onClick={() => handleNotificationForm('monthSettingType', 'SIMPLE_DATE')}
      >
        날짜로 선택하기 <Style.ArrowIcon isSelected={isSimpleDateType}>{isSimpleDateType ? ARROW.DOWN_LG : ARROW.DOWN_LG_NON_FOCUS}</Style.ArrowIcon>
      </Style.MonthlySelectTitle>
      {isSimpleDateType && (
        <div style={{ width: '100%' }}>
          <Style.Notice>
            <span>{notificationForm.sendDay}</span>
            일로 설정 {notificationForm.sendDay === 31 ? '(말일로 설정됩니다)' : ''}
          </Style.Notice>
          <Style.CalendarBlock>
            {createFixedCalendar().map((week, i) => {
              return (
                <Style.WeekBlock key={i}>
                  {week.map((date, i) => {
                    return (
                      <Style.DateButton //
                        isSelected={notificationForm.sendDay === date}
                        key={i}
                        onClick={() => {
                          date !== null && handleNotificationForm('sendDay', date);
                        }}
                      >
                        {date}
                      </Style.DateButton>
                    );
                  })}
                </Style.WeekBlock>
              );
            })}
          </Style.CalendarBlock>
        </div>
      )}

      {/* 매달>요일로 선택하기 */}
      <Style.MonthlySelectTitle //
        isSelected={isSelectDayType}
        onClick={() => handleNotificationForm('monthSettingType', 'WEEK')}
      >
        요일로 선택하기 <Style.ArrowIcon isSelected={isSelectDayType}>{isSelectDayType ? ARROW.DOWN_LG : ARROW.DOWN_LG_NON_FOCUS}</Style.ArrowIcon>
      </Style.MonthlySelectTitle>
      {isSelectDayType && (
        <div>
          <Style.Notice>{description(sortedNotificationForm)}</Style.Notice>
          <Style.Notice>
            <div>몇 번째</div>
            {isErrorField('ordinalNumbers') && <Style.ErrorText>최소 1개 이상 선택해주세요.</Style.ErrorText>}
            {ordinaryError && <Style.ErrorText>최대 2개까지 선택할 수 있습니다.</Style.ErrorText>}
          </Style.Notice>
          <Style.OrdinalNumberConatiner>
            {ORDINARY_LIST.map(({ label, value }) => {
              return (
                <Style.SelectDayButton //
                  key={label}
                  isSelected={notificationForm.ordinalNumbers?.includes(value)}
                  onClick={() => {
                    if (isDuplicateOrdinaryNumbers(value)) {
                      setOrdinaryError(false);
                      return subtractDuplicateOrdinaryNumbers(value);
                    }

                    if (isOverTwoOrdinaryNumbers()) {
                      return setErrorMessageDuring(2000);
                    }

                    addDuplicateOrdinaryNumbers(value);
                  }}
                >
                  {label}
                </Style.SelectDayButton>
              );
            })}
          </Style.OrdinalNumberConatiner>
          <Style.Notice>
            <div>요일선택</div>
            {isErrorField('daysOfWeek') && <Style.ErrorText>최소 1개 이상 선택해주세요.</Style.ErrorText>}
          </Style.Notice>
          <DaySelector
            notificationForm={notificationForm} //
            handleDuplicateValues={handleDuplicateValues}
          />
        </div>
      )}
    </>
  );
};

export default MonthForm;
