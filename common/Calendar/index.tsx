import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ARROW } from '../../assets/icons/Arrow';
import { MARK } from '../../assets/icons/Mark';
import Button from '../../common/Button';
import createCalendar from '../../utils/createCalendar';
import DateCellWithMark from './DateCellWithMark';
import DateCellWithTag from './DateCellWithTag';
import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalnedrProps {
  cellType: 'Mark' | 'Tag';
}

const Calendar: FC<CalnedrProps> = ({ cellType }) => {
  const [baseDate, setBaseDate] = useState(dayjs());
  const today = dayjs();
  const monthList = createCalendar(baseDate);
  const param = useParams();
  const navigate = useNavigate();
  const { groupID } = param;

  const addMonth = () => {
    setBaseDate(baseDate.add(1, 'month'));
  };
  const subMonth = () => {
    setBaseDate(baseDate.subtract(1, 'month'));
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === baseDate.month();
  };

  const isToday = (date: Dayjs) => {
    return date.format('YY-MM-DD') === today.format('YY-MM-DD');
  };

  const goDetail = () => {
    navigate(`/group/${groupID}/book/detail`);
  };

  return (
    <>
      <Style.Layout>
        <span>벌금 장부</span>
        <Style.Header>
          <div>
            <Style.DateHeader>{baseDate.format('YYYY년 MM월')}</Style.DateHeader>
            <div>
              <Style.ArrowWrapper onClick={subMonth}>{ARROW.LEFT}</Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={addMonth}>{ARROW.RIGHT}</Style.ArrowWrapper>
            </div>
          </div>
          {cellType === 'Tag' && (
            <Button width="124px" color="black">
              내역 추가하기
            </Button>
          )}
        </Style.Header>
        <Style.WeekDate>
          {WEEKDATE.map((date) => (
            <div key={date}>{date}</div>
          ))}
        </Style.WeekDate>
        <Style.CalendarContainer length={monthList.length} mini={cellType === 'Mark'}>
          {monthList.map((weeks, idx) => (
            <Style.WeekWrap key={idx} onClick={goDetail}>
              {weeks.map((date) => (
                <>
                  {cellType === 'Tag' ? (
                    <DateCellWithTag date={date} key={date.date()} isCurrentMonth={isCurrentMonth} isToday={isToday} />
                  ) : (
                    <DateCellWithMark date={date} key={date.date()} isCurrentMonth={isCurrentMonth} isToday={isToday} />
                  )}
                </>
              ))}
            </Style.WeekWrap>
          ))}
        </Style.CalendarContainer>
      </Style.Layout>
    </>
  );
};

export default Calendar;