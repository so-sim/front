import { EventInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { DropDownWrapper } from '../DropDownWrapper';
import * as Style from './styles';

interface DetailListProps {
  details?: EventInfo[];
  page: number;
  setSelect: Dispatch<SetStateAction<EventInfo>>;
  setOpenUserDetails: Dispatch<SetStateAction<boolean>>;
}

export const DetailList: FC<DetailListProps> = ({ details, page, setSelect, setOpenUserDetails }) => {
  if (details == null) return null;
  if (details.length === 0) return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;

  return (
    <>
      {details.map((detail, i) => {
        const { groundsDate, userName, payment, grounds } = detail;
        return (
          <Style.TableRow
            key={i}
            onClick={(e) => {
              setSelect(detail);
              setOpenUserDetails(true);
            }}
          >
            <Style.Element hasEllipsis={false}>{(groundsDate.split(' ')[0] as string).replaceAll('-', '.')}</Style.Element>
            <DropDownWrapper detail={detail} />
            <Style.Element hasEllipsis>{userName}</Style.Element>
            <Style.Element hasEllipsis>{changeNumberToMoney(payment)}</Style.Element>
            <Style.Element hasEllipsis>{grounds}</Style.Element>
          </Style.TableRow>
        );
      })}
    </>
  );
};
