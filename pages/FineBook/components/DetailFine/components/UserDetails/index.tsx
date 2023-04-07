import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import Button from '@/common/Button';
import { Label } from '@/common/Label';
import { DropBox } from '@/common/DropBox';
import * as Style from './styles';
import { EventInfo, PaymentType } from '@/types/event';
import { FineBookModal } from '@/common/Modal/FineBookModal';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { getStatusCode, getStatusText } from '@/utils/getStatusIcon';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { TwoButtonModal } from '@/common/Modal/TwoButtonModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';

interface UserDetailsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  select: EventInfo;
  setSelect: Dispatch<SetStateAction<EventInfo>>;
}

export const UserDetails = ({ open, setOpen, select, setSelect }: UserDetailsProps) => {
  if (!open) return null;
  const { eventId, groundsDate, paymentType, userName, payment, grounds, userId } = select;

  const { groupId } = useParams();

  const { data } = useGroupDetail({ groupId: Number(groupId) });

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [openDeleteDetailModal, setOpenDeleteDetailModal] = useState(false);
  const user = useRecoilValue(userState);

  const statusList: { title: PaymentType; id?: string }[] = [{ title: '미납', id: 'nonpayment_side' }, { title: '완납', id: 'fullpayment_side' }, { title: '확인필요' }];
  const [newStatus, setNewStatus] = useState<PaymentType>('');

  const { mutate: update } = useUpdateDetailStatus();
  const { mutate: deleteDetail } = useDeleteDetail();

  const updateStatus = () => {
    if (getStatusCode(newStatus) !== paymentType) {
      update(
        { paymentType: getStatusCode(newStatus), eventId },
        {
          onSuccess() {
            setOpenUpdateStatusModal(false);
          },
        },
      );
    }
  };

  const deleteDetailInfo = () => {
    deleteDetail(eventId, {
      onSuccess() {
        setOpenDeleteDetailModal(false);
        setOpen(false);
      },
    });
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

  const cancelDeleteDetail = () => {
    setOpenDeleteDetailModal(false);
  };

  const closeUserDetails = () => {
    setOpen(false);
    setSelect({
      userId: 0,
      eventId: 0,
      groundsDate: '',
      paymentType: 'non',
      userName: '',
      payment: 0,
      grounds: '',
    });
  };

  useEffect(() => {
    if (newStatus !== '') {
      setOpenUpdateStatusModal(true);
    }
  }, [newStatus]);

  const dropdownStatusList = () => {
    if (data?.content.isAdmin) {
      return statusList.filter((status) => {
        if (newStatus) {
          return status.title !== newStatus && status.title !== '확인필요';
        } else {
          return status.title !== getStatusText(paymentType) && status.title !== '확인필요';
        }
      });
    }
    if (user.userId === userId) {
      return statusList.filter((status) => {
        if (paymentType === 'non') {
          return status.title === '확인필요';
        }
      });
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
              <DropBox
                color={(user.userId === userId && paymentType === 'non' && newStatus !== '확인필요') || data?.content.isAdmin ? 'white' : 'disabled'}
                boxWidth="112px"
                width={112}
                setType={setNewStatus}
                type={newStatus !== '' ? newStatus : paymentType === 'con' && !data?.content.isAdmin ? '확인중' : getStatusText(paymentType)}
                dropDownList={dropdownStatusList()}
              />
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요.">
              {grounds}
            </Style.TextArea>
          </Label>
        </Style.UserDetailsContent>
        {data?.content.isAdmin && (
          <Style.Footer>
            <Button onClick={handleDeleteDetailModal} color="white">
              삭제
            </Button>
            <Button onClick={handleUpdateModal} color="black">
              수정
            </Button>
          </Style.Footer>
        )}
      </Style.UserDetailsFrame>
      {openUpdateStatusModal && (
        <TwoButtonModal
          id={getStatusCode(newStatus) === 'full' ? 'fullpayment_side_modal' : ''}
          onClick={cancelUpdateStatus}
          title="납부여부 변경"
          height="215px"
          description="납부여부를 변경하시겠습니까?"
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: updateStatus }}
        />
      )}
      {openDeleteDetailModal && (
        <TwoButtonModal
          onClick={cancelDeleteDetail}
          title="내역 삭제"
          height="240px"
          description={`벌금 내역을 삭제하시겠습니까? \n 삭제된 내역은 복구가 불가능합니다.`}
          cancel={{ text: '취소', onClick: cancelDeleteDetail }}
          confirm={{ text: '삭제하기', onClick: deleteDetailInfo }}
        />
      )}
      {openUpdateModal && <FineBookModal eventId={eventId} select={select} setOpen={setOpenUpdateModal} />}
    </>
  );
};
