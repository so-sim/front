import { Dispatch, SetStateAction, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Label, DropBox, Button } from '@/components/@common';
import * as Style from './styles';
import { Situation, SelectedEventInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { useParams } from 'react-router-dom';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { initialSelectData } from '@/pages/FineBook/DetailFine';

import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import FineBookUpdateModal from '@/components/@common/Modal/FineBookModal/FineBookUpdateModal';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { userState } from '@/store/userState';
import { useRecoilState } from 'recoil';
import useSituationList, { SituationText } from '@/hooks/useSituationList';

type Props = {
  select: SelectedEventInfo;
  setSelect: Dispatch<SetStateAction<SelectedEventInfo>>;
};

const REQUEST_BUTTON: { [key in Situation]: string } = {
  미납: '확인 요청',
  확인중: '요청 완료',
  완납: '확인 완료',
};

const UserDetails = ({ select, setSelect }: Props) => {
  const { eventId, date, situation, nickname, amount, memo, ground } = select;
  const { groupId } = useParams();

  const [{ isAdmin }, setUser] = useRecoilState(userState);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const handleDeleteConfirmModal = () => {
    openConfirmModal({
      type: 'DETAIL_DELETE',
      confirm: deleteDetailInfo,
      cancel: closeConfirmModal,
    });
  };

  const handleRequestConfirmModal = () => {
    openConfirmModal({
      type: 'REQUEST_CHANGE_STATUS',
      confirm: requestConfirmStatus,
      cancel: closeConfirmModal,
      id: GA.CON.SIDE_MODAL,
    });
  };

  const handleUpdateStatusConfirmModal = (situation: SituationText) => {
    const convertedSituation = convertTextToSituation(situation);
    openConfirmModal({
      type: 'CHANGE_STATUS',
      confirm: () => updateStatus(convertedSituation),
      cancel: closeConfirmModal,
      id: situation === '완납' ? GA.FULL.SIDE_MODAL : '',
    });
  };

  const onSuccessUpdateStatus = (situation: Situation) => {
    closeConfirmModal();
    setSelect((prev) => ({ ...prev, situation }));
    if (isAdmin === true && situation === '완납') return pushDataLayer('fullpayment', { route: 'detail' });
    if (isAdmin === false) pushDataLayer('confirming', { route: 'detail' });
  };

  const closeUserDetails = () => {
    setSelect(initialSelectData);
  };

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { data: myNickname } = useGetMyNikname(Number(groupId));
  const { dropdownList, convertTextToSituation, convertSituationToText } = useSituationList(situation);
  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { mutate: deleteDetail } = useDeleteDetail(closeUserDetails);

  const updateStatus = (situation: Situation) => {
    mutateDetailStatus({ situation, eventIdList: [eventId] });
  };

  const requestConfirmStatus = () => {
    mutateDetailStatus({ situation: '확인중', eventIdList: [eventId] });
  };

  const deleteDetailInfo = () => {
    deleteDetail(eventId);
  };

  const isOwn = nickname === myNickname?.content.nickname;
  const filteredSituationList = dropdownList //
    .filter((title) => convertTextToSituation(title) !== situation)
    .map((title) => ({ title }));

  return (
    <>
      <Style.UserDetailsFrame>
        <Style.Header>
          <Style.CloseIcon onClick={closeUserDetails}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>
        <Style.UserDetailsContent>
          <Style.BetweenBlock>
            <Style.Date>{date.slice(2)}</Style.Date>
            {isAdmin ? (
              <Style.ButtonBox>
                <Style.AdminButton onClick={handleDeleteConfirmModal}>삭제</Style.AdminButton>
                <Style.AdminButton onClick={handleUpdateModal}>수정</Style.AdminButton>
              </Style.ButtonBox>
            ) : (
              <div />
            )}
          </Style.BetweenBlock>
          <Style.Block>
            <Style.PersonIcon>{USER.PERSON_XL}</Style.PersonIcon>
            <Style.Text>{nickname}</Style.Text>
          </Style.Block>
          <Style.Block>
            <Style.Text>{changeNumberToMoney(amount)}원</Style.Text>
          </Style.Block>
          <Style.Row>
            <Label title="사유" width="32px">
              <Style.GroundBox>{ground}</Style.GroundBox>
            </Label>
            <Label title="납부여부" width="80px">
              {isAdmin ? (
                <DropBox
                  color="white"
                  boxWidth="112px"
                  width={112}
                  setType={handleUpdateStatusConfirmModal}
                  type={convertSituationToText(situation)} //Todo: GA 코드 추가해야됨
                  dropDownList={filteredSituationList}
                />
              ) : (
                <Style.StatusButton situation={situation}>{situation}</Style.StatusButton>
              )}
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요." value={memo} />
          </Label>
        </Style.UserDetailsContent>
        <Style.Footer>
          {!isAdmin && isOwn && (
            <Button
              width="150px"
              height="42px"
              color={situation === '미납' ? 'black' : 'disabled'} //
              onClick={handleRequestConfirmModal}
              id={GA.CON.SIDE_BUTTON}
            >
              {REQUEST_BUTTON[situation]}
            </Button>
          )}
        </Style.Footer>
      </Style.UserDetailsFrame>
      {showUpdateModal && <FineBookUpdateModal select={select} modalHandler={handleUpdateModal} setSelect={setSelect} />}
    </>
  );
};

export default UserDetails;
