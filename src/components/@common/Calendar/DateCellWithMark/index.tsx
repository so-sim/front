import { FilterMode } from '@/pages/FineBook/DetailFine';
import { PayMentTpyeCountMap } from '@/types/event';
import { handleDate } from '@/utils/handleDate';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { MARK } from '@/assets/icons/Mark';
import * as Style from './styles';

interface DateCellWithMarkProps {
  date: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  mode: FilterMode;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  isSelectedPeriod: boolean;
  status: PayMentTpyeCountMap | undefined;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, isSelectedPeriod, status, startDate, endDate, mode }) => {
  const { dateToFormatting } = handleDate;

  const currentMonth = isCurrentMonth(date);
  const isFirst = dateToFormatting(startDate) === dateToFormatting(date);
  const isLast = dateToFormatting(endDate) === dateToFormatting(date);

  return (
    <Style.DateCell>
      <Style.Date mode={mode} isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={isCurrentMonth(date)} isSelectedPeriod={isSelectedPeriod}>
        {isSelectedPeriod && <Style.SelectedPeriod mode={mode} isSelectedPeriod={isSelectedPeriod} isFirst={isFirst} isLast={isLast} />}
        {date.date()}
      </Style.Date>
      <Style.Mark>
        {status && currentMonth && (
          <>
            {status['완납'] && !status['확인중'] && !status['미납'] && <span>{MARK.BLUE}</span>}
            {status['확인중'] && <span>{MARK.YELLOW}</span>}
            {status['미납'] && <span>{MARK.RED}</span>}
          </>
        )}
      </Style.Mark>
    </Style.DateCell>
  );
};

export default DateCellWithMark;
