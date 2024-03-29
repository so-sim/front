import { ARROW } from '@/assets/icons/Arrow';
import createCalendar from '@/utils/createCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { isSafari } from 'react-device-detect';
import * as Style from './styles';

interface MiniCalendarProps {
  type: string;
  setType: (value: string) => void;
  setOpenDrop: Dispatch<SetStateAction<boolean>>;
  trigger?: JSX.Element;
  isInvalidate?: (date: string) => boolean;
}

const MiniCalendar: FC<MiniCalendarProps> = ({ type, setType, setOpenDrop, trigger, isInvalidate }) => {
  /**
   * Safari에서는 date에 '.'이 들어가면 오류가 발생한다.
   * ex) 2021.09.01 : x
   * ex) 2021-09-01 : o
   *  */
  const convertedType = isSafari ? type.replaceAll(/\./g, '-') : type;

  const [baseDate, setBaseDate] = useState(dayjs(convertedType));
  const [tempDate, setTempDate] = useState(dayjs(convertedType).format('YYYY-MM-DD'));
  const calendarArray = createCalendar(baseDate);

  const DAY_LIST = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handleDate = (date: Dayjs) => {
    if (!trigger) {
      setType(date.format('YYYY-MM-DD'));
      setOpenDrop(false);
      return;
    }
    setTempDate(date.format('YYYY-MM-DD'));
  };

  const handleSubmit = () => {
    setType(tempDate);
    setOpenDrop(false);
  };

  const decreaseMonth = () => {
    setBaseDate((prev) => prev.subtract(1, 'month'));
  };

  const increaseMonth = () => {
    setBaseDate((prev) => prev.add(1, 'month'));
  };

  return (
    <Style.Calendar>
      <Style.DateTitle>
        <Style.Date>{`${baseDate.year()}년 ${baseDate.month() + 1}월`} </Style.Date>
        <Style.ArrowBlock>
          <Style.ArrowIcon onClick={decreaseMonth}>{ARROW.LEFT_MD}</Style.ArrowIcon>
          <Style.ArrowIcon onClick={increaseMonth}>{ARROW.RIGHT_MD}</Style.ArrowIcon>
        </Style.ArrowBlock>
      </Style.DateTitle>
      <Style.DayTitle>
        {DAY_LIST.map((day, i) => (
          <Style.DayType isSunday={i === 0} key={i}>
            {day}
          </Style.DayType>
        ))}
      </Style.DayTitle>
      {calendarArray.map((week) => {
        return (
          <Style.Week key={week[0].format('YYYY-MM-DD')}>
            {week.map((date, i) => {
              const isInvalid = isInvalidate && isInvalidate(date.format('YYYY-MM-DD'));
              return (
                <Style.Day
                  isOtherMonth={date.month() !== baseDate.month()}
                  isSelected={tempDate === date.format('YYYY-MM-DD')}
                  isSunday={i === 0}
                  isInvalid={isInvalid}
                  onClick={() => {
                    if (isInvalid) return;
                    handleDate(date);
                  }}
                  key={date.format('YYYY-MM-DD')}
                >
                  {date.date()}
                </Style.Day>
              );
            })}
          </Style.Week>
        );
      })}
      {trigger && (
        <Style.Trigger>
          <span onClick={handleSubmit}>{trigger}</span>
        </Style.Trigger>
      )}
    </Style.Calendar>
  );
};

export default MiniCalendar;
