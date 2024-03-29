import { ALARM } from '@/assets/icons/Alarm';
import { GA } from '@/constants/GA';
import useCheckListState from '@/hooks/useCheckListState';
import { useGetAlarmListCount } from '@/queries/Notification/useGetAlarmListCount';
import { alarmInfoState } from '@/store/alarmInfoState';
import { notificationModalState } from '@/store/notificationModalState';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import AlarmDetail from './AlarmDetail';

import * as Style from './styles';

type Props = {
  headerHeight: number;
};

const AlarmComponent = ({ headerHeight }: Props) => {
  // const [showAlarmDetail, setShowAlarmDetail] = useState(false);
  const [showNotification, setShowNotification] = useRecoilState(notificationModalState);
  // 기존 컴포넌트 내부 state였는데 알람 On/off시  납부여부 변경 및 요청 페이지 , 상세리스트디테일 페이지가 닫혀야해서 전역으로 변경

  const navigate = useNavigate();

  const location = useLocation();

  const [searchParam, _] = useSearchParams();
  // searchParam 사용이유 - 전역상태로 만들려면 isnotification false를 달아줘야한다는 생각에 searchparam으로..

  const [alarmIdList, setAlarmIdList] = useRecoilState(alarmInfoState);

  const {
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  useEffect(() => {
    if (alarmIdList.groupId) {
      setShowNotification(true);
    }
    // 이 부분때문에 초기화를 시켜줘야함  (해당 코드는 다른 페이지 이동시에 닫혀야하는데 알람Info클릭 시에는 열려있어야해서 추가해준 코드)
    // url이 달라지면 기본적으로 닫혀야하는데, '납부변경 알람' 클릭 시에는 url이 달라지면서 유지가 되어야함으로 추가된 코드
    return () => {
      setShowNotification(false);
    };
  }, [location]);

  const { data, isLoading } = useGetAlarmListCount();

  const notificationCount = data?.content.count! > 99 ? '99+' : data?.content.count;

  const goToMobileNotificationList = () => {
    navigate(`/m-notification`);
  };

  const handleToggleNotificationModal = () => {
    setShowNotification((prev) => !prev);
    setInitCheckDetailFine();
  };

  return (
    <>
      <Style.AlarmIconWrapper
        id={GA.ALARM.BUTTON}
        $isCount={notificationCount !== 0 && !isLoading}
        data-count={notificationCount}
        onClick={isMobile ? goToMobileNotificationList : handleToggleNotificationModal}
      >
        {ALARM.ALARM}
      </Style.AlarmIconWrapper>
      {showNotification && !isMobile && <AlarmDetail headerHeight={headerHeight} setShowAlarmDetail={setShowNotification} />}
      {/* !isMobile을 안넣어줬을 때 AlarmDetail이 Mobile화면에서 출력이 되는 버그가 있다... ?(why.. isMobile에 따라 버튼 트리거도 다른데)  */}
    </>
  );
};

export default AlarmComponent;
