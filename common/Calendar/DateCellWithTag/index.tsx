import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { MARK } from '../../../assets/icons/Mark';
import * as Style from './styles';

interface DateCellWitTagProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
}

const DateCellWithTag: FC<DateCellWitTagProps> = ({ date, isCurrentMonth, isToday }) => {
  return (
    <>
      <Style.DateCell key={date.day()} isCurrentMonth={isCurrentMonth(date)}>
        <span>{date.date()}</span>
        <Style.TodayMark isToday={isToday(date)} />
        <Style.Tag color="red">
          <div>{MARK.RED}</div>
          <span>미납자 있음</span>
          <span>(1)</span>
        </Style.Tag>
        <Style.Tag color="orange">
          <div>{MARK.YELLOW}</div>
          <span>관리자 승인 중</span>
          <span>(10)</span>
        </Style.Tag>
        <Style.Tag color="blue">
          <div>{MARK.BLUE}</div>
          <span>모두 완납</span>
        </Style.Tag>
      </Style.DateCell>
    </>
  );
};

export default DateCellWithTag;