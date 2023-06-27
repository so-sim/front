import DropBox from '@/components/@common/DropBox';
import { CalendarDropBox } from '@/components/@common/DropBox/CalendarDropBox';
import Label from '@/components/@common/Label';
import { GA } from '@/constants/GA';
import { Ground, SelectedEventInfo } from '@/types/event';
import { useParticipantList } from '@/queries/Group';
import { Situation } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertPriceFormat';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as Style from '../styles';
import CirCleCheckBox from './circlecheckbox';

const STATUS_LIST: { title: Situation; id?: string }[] = [
  { title: '미납', id: GA.NON.LIST_MODAL },
  { title: '완납', id: GA.FULL.LIST_MODAL },
];

const GroundArr: Ground[] = ['지각', '결석', '과제 안 함', '기타'];
type Props = {
  dispatch: any;
  selectData: SelectedEventInfo;
};

const FormFileds = ({ selectData, dispatch }: Props) => {
  const { groupId } = useParams();
  const { data: participants } = useParticipantList(Number(groupId));
  console.log(selectData);

  const admin = { title: participants?.content.adminNickname as string };
  const participantList = participants?.content.nicknameList.map((nickname) => ({ title: nickname })) || [];
  const memberList = [admin, ...participantList];

  const onChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'PAYMENT', amount: e.target.value });
    // console.log(e.target.value);
  };

  const onChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'MEMO', memo: e.target.value });
  };

  const onChangeGround = (ground: Ground) => {
    dispatch({ type: 'GROUND', ground });
  };
  const onChangeGroundsDate = (date: string) => {
    dispatch({ type: 'GROUNDS_DATE', date });
  };

  const onChangeUserName = (nickname: string) => {
    dispatch({ type: 'USER_NAME', nickname });
  };

  const onChanePaymentType = (situation: Situation) => {
    dispatch({ type: 'PAYMENT_TYPE', situation });
  };
  return (
    <>
      <Style.Row>
        <Label title="팀원" width="32px" margin="0px">
          <DropBox boxWidth="146px" width={304} setType={onChangeUserName} type={selectData.nickname} dropDownList={memberList} direction="right" />
        </Label>
        <Label title="납부여부" width="56px" margin="0px">
          <DropBox
            color="white"
            boxWidth="110px"
            width={112}
            setType={onChanePaymentType}
            type={selectData.situation}
            dropDownList={STATUS_LIST.filter((paymentType) => paymentType.title !== selectData.situation)}
          />
        </Label>
      </Style.Row>
      <Style.Row>
        <Label title="금액" width="32px" margin="0px">
          <Style.Input type="string" value={convertToPriceFormat(selectData.amount)} onChange={onChangePayment} style={{ height: '32px' }} />
        </Label>
        <Label title="날짜" width="32px" margin="0px">
          <CalendarDropBox type={selectData.date} setType={onChangeGroundsDate} color="white" />
        </Label>
      </Style.Row>
      <Style.Row>
        <Label title="사유" width="32px" margin="0px">
          <Style.ContainerForLabel>
            {GroundArr.map((item: Ground) => (
              <CirCleCheckBox
                id={item}
                isChecked={selectData.ground === item}
                onChange={() => {
                  onChangeGround(item);
                }}
              />
            ))}
          </Style.ContainerForLabel>
        </Label>
      </Style.Row>
      <Label title="메모" width="32px" margin="0px">
        <Style.TextArea maxLength={65} onChange={onChangeMemo} defaultValue={selectData.memo} placeholder="내용을 입력해주세요." />
        <Style.Length>{selectData.memo.length}/65</Style.Length>
      </Label>
    </>
  );
};

export default FormFileds;
