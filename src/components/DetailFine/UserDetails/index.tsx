import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Label, DropBox, Button } from '@/components/@common';
import * as Style from './styles';
import { ClientEventInfo, PaymentType, ServerPaymentType } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { getStatusCode, getStatusText, statusText } from '@/utils/status';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import { ConfirmModal } from '@/components/@common/Modal/ConfirmModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { initialSelectData } from '@/pages/FineBook/DetailFine';
import { DETAIL, DETAIL_STATUS } from '@/constants/Detail';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  select: ClientEventInfo;
  setSelect: Dispatch<SetStateAction<ClientEventInfo>>;
};

const REQUEST_BUTTON: { [key in ServerPaymentType]: string } = {
  non: '확인 요청',
  con: '요청 완료',
  full: '확인 완료',
};

const UserDetails = ({ open, setOpen, select, setSelect }: Props) => {
  if (!open) return null;
  const { eventId, groundsDate, paymentType, userName, payment, grounds, userId } = select;

  const { groupId } = useParams();

  const { data: groupDetail } = useGroupDetail(Number(groupId));

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [openRequestStatusModal, setOpenRequestStatusModal] = useState(false);
  const [openDeleteDetailModal, setOpenDeleteDetailModal] = useState(false);

  const user = useRecoilValue(userState);

  const isAdmin = groupDetail?.content.isAdmin as boolean;
  const isOwn = user.userId === userId;

  const statusList: { title: PaymentType; id?: string }[] = [{ title: '미납', id: 'nonpayment_side' }, { title: '완납', id: 'fullpayment_side' }, { title: '확인필요' }];
  const [newStatus, setNewStatus] = useState<PaymentType>('');

  const onSuccessUpdateStatus = (paymentType: ServerPaymentType) => {
    setOpenUpdateStatusModal(false);
    setOpenRequestStatusModal(false);
    setNewStatus('');

    setSelect((prev) => ({ ...prev, paymentType }));
    if (isAdmin === true && paymentType === 'full') return pushDataLayer('fullpayment', { route: 'detail' });
    if (isAdmin === false) pushDataLayer('confirming', { route: 'detail' });
  };

  const onSuccessDeleteInfo = () => {
    setOpenDeleteDetailModal(false);
    setOpen(false);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { mutate: deleteDetail } = useDeleteDetail(onSuccessDeleteInfo);

  const updateStatus = () => {
    if (newStatus === '') return;
    if (getStatusCode(newStatus) !== paymentType) {
      mutateDetailStatus({ paymentType: getStatusCode(newStatus), eventId });
    }
  };

  const deleteDetailInfo = () => {
    deleteDetail(eventId);
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal((prev) => !prev);
  };

  const handleDeleteDetailModal = () => {
    setOpenDeleteDetailModal((prev) => !prev);
  };

  const cancelUpdateStatus = () => {
    setNewStatus('');
    setOpenUpdateStatusModal(false);
  };

  const handleRequestStatus = () => {
    setOpenRequestStatusModal((prev) => !prev);
  };

  const closeUserDetails = () => {
    setOpen(false);
    setSelect(initialSelectData);
  };

  useEffect(() => {
    if (newStatus !== '') {
      setOpenUpdateStatusModal(true);
    }
  }, [newStatus]);

  const dropdownStatusList = () => {
    if (isAdmin) {
      return statusList.filter((status) => {
        if (newStatus && status.title !== '확인필요') {
          return status.title !== newStatus;
        } else {
          return status.title !== getStatusText(paymentType);
        }
      });
    }
    if (isOwn) {
      return statusList.filter((status) => paymentType === 'non' && status.title === '확인필요');
    }
    return [];
  };

  return (
    <>
      <Style.UserDetailsFrame>
        <Style.Header>
          <Style.CloseIcon onClick={closeUserDetails}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>
        <Style.UserDetailsContent>
          <Style.Block>
            <Style.PersonIcon>{USER.PERSON_XL}</Style.PersonIcon>
            <Style.Text>{userName}</Style.Text>
          </Style.Block>
          <Style.Block>
            <Style.Text>{changeNumberToMoney(payment)}원</Style.Text>
          </Style.Block>
          <Style.Row>
            <Label title="날짜" width="32px">
              <DropBox color="disabled" setType={() => undefined} boxWidth="116px" width={116} type={groundsDate.split(' ')[0]} dropDownList={statusList} />
            </Label>
            <Label title="납부여부" width="80px">
              {isAdmin || (isOwn && paymentType === 'non') ? (
                <DropBox
                  color={newStatus !== 'con' ? 'white' : 'disabled'}
                  boxWidth="112px"
                  width={112}
                  setType={setNewStatus}
                  type={newStatus !== '' ? newStatus : paymentType === 'con' && !isAdmin ? '확인중' : getStatusText(paymentType)}
                  dropDownList={dropdownStatusList()}
                />
              ) : (
                <Style.StatusButton status={paymentType}>{statusText(isAdmin, isOwn, paymentType as ServerPaymentType)}</Style.StatusButton>
              )}
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요." value={grounds}></Style.TextArea>
          </Label>
        </Style.UserDetailsContent>
        {isAdmin && (
          <Style.Footer>
            <Button onClick={handleDeleteDetailModal} color="white">
              삭제
            </Button>
            <Button onClick={handleUpdateModal} color="black">
              수정
            </Button>
          </Style.Footer>
        )}
        {!isAdmin && isOwn && (
          <Style.Footer>
            <Button width="150px" height="42px" color={paymentType === 'non' ? 'black' : 'disabled'} onClick={handleRequestStatus} id="confirming_side">
              {REQUEST_BUTTON[paymentType as ServerPaymentType]}
            </Button>
          </Style.Footer>
        )}
      </Style.UserDetailsFrame>
      {openUpdateStatusModal && (
        <ConfirmModal
          id={newStatus !== '' && getStatusCode(newStatus) === 'full' ? 'fullpayment_side_modal' : ''}
          modalHandler={cancelUpdateStatus}
          title={DETAIL_STATUS.CHANGE.title}
          description={DETAIL_STATUS.CHANGE.description}
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: updateStatus }}
        />
      )}
      {openRequestStatusModal && (
        <ConfirmModal
          id="confirming_side_modal"
          modalHandler={handleRequestStatus}
          title={DETAIL_STATUS.REQUEST.title}
          description={DETAIL_STATUS.REQUEST.description}
          cancel={{ text: '취소', onClick: handleRequestStatus }}
          confirm={{ text: '요청하기', onClick: updateStatus }}
        />
      )}
      {openDeleteDetailModal && (
        <ConfirmModal
          modalHandler={handleDeleteDetailModal}
          title={DETAIL.DELETE.title}
          description={DETAIL.DELETE.description}
          cancel={{ text: '취소', onClick: handleDeleteDetailModal }}
          confirm={{ text: '삭제하기', onClick: deleteDetailInfo }}
        />
      )}
      {openUpdateModal && <FineBookModal eventId={eventId} select={select} setOpen={setOpenUpdateModal} setSelect={setSelect} />}
    </>
  );
};
export default UserDetails;
