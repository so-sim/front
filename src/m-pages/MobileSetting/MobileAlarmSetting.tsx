import { ARROW } from '@/assets/icons/Arrow';
import { Button } from '@/components/@common';
import NotificationForm from '@/components/@common/Modal/GroupSettingModal/AdminModal/NotifiactionForm';
import useNotificationForm from '@/hooks/Group/useNotificationForm';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MobileAlarmSetting = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const {
    notificationForm,
    notificationInfoLoading, //
    getNotificationFormAction,
  } = useNotificationForm();

  const { submitNotificationForm } = getNotificationFormAction();

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="모임 설정">
      <div style={{ marginTop: '20px', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 24px' }}>
        <NotificationForm //
          notificationForm={notificationForm}
          getNotificationFormAction={getNotificationFormAction}
        />
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <Button color="white" width="100%" height="42px">
            취소
          </Button>
          <Button color="black" width="100%" height="42px" loading={notificationInfoLoading} onClick={submitNotificationForm}>
            저장
          </Button>
        </div>
      </div>
    </ModalPageLayout>
  );
};

export default MobileAlarmSetting;