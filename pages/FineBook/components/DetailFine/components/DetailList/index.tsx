import React, { Dispatch, FC, SetStateAction } from 'react';
import { Details } from '../..';
import { CircleDropButton } from '../CircleDropButton';
import * as Style from './styles';

interface DetailListProps {
  details: Details[];
  page: number;
  setSelect: Dispatch<SetStateAction<Details>>;
  setOpenUserDetails: Dispatch<SetStateAction<boolean>>;
}

export const DetailList: FC<DetailListProps> = ({ details, page, setSelect, setOpenUserDetails }) => {
  if (details.length === 0) return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;

  const COUNT_PER_PAGE = 16;

  return (
    <>
      {details.map((detail, i) => {
        const isCorrect = i >= COUNT_PER_PAGE * (page - 1) && i < COUNT_PER_PAGE * page;

        if (isCorrect) {
          const { date, status, name, fine, reason } = detail;
          return (
            <Style.TableRow
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setSelect(detail);
                setOpenUserDetails(true);
              }}
            >
              <span>{date}</span>
              <Style.DropDownWrapper
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <CircleDropButton status={status} />
              </Style.DropDownWrapper>
              <span>{name}</span>
              <span>{fine}</span>
              <span>{reason}</span>
            </Style.TableRow>
          );
        }
      })}
    </>
  );
};