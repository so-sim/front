import * as Style from './styles';
import { LOGO } from '@/assets/icons/Logo/index';
import { useState } from 'react';
import { AuthModal } from '@/components/@common/Modal/LoginModal';
import { GNB_LINK } from '@/constants/ServiceLink';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import UserConfig from './UserConfig';
import { GA } from '@/constants/GA';
import { ALARM } from '@/assets/icons/Alarm';
import AlarmComponent from '@/components/Alarm';

const GNBLinkList = [
  { title: '서비스 소개', href: GNB_LINK.SERVICE, id: GA.INTRODUCTION },
  { title: '의견 남기기', href: GNB_LINK.SUGGEST, id: GA.FEEDBACK },
  { title: '이용 가이드', href: GNB_LINK.FAQ, id: GA.GUIDE },
];

/** 여기에서 로그인 관련 수행 */
export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const user = useRecoilValue(userState);

  const loginModalHandler = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <Style.Header>
        <Style.Wrapper>
          <Style.HeaderLeft>
            <Style.HeaderLogo onClick={() => (window.location.href = process.env.REACT_APP_SERVICE_URL as string)}>{LOGO.SM}</Style.HeaderLogo>
            <Style.NavSection>
              {GNBLinkList.map((list) => (
                <Style.GNBLink href={list.href} target="_blank" rel="noopnner noreferrer" key={list.title} id={list.id}>
                  {list.title}
                </Style.GNBLink>
              ))}
            </Style.NavSection>
          </Style.HeaderLeft>
          <Style.HeaderRight>
            <AlarmComponent />
          </Style.HeaderRight>
          <Style.HeaderRight>{user.userId === null ? <Style.Login onClick={loginModalHandler}>로그인/회원가입</Style.Login> : <UserConfig />}</Style.HeaderRight>
        </Style.Wrapper>
      </Style.Header>
      {openModal && <AuthModal modalHandler={loginModalHandler} />}
    </>
  );
};
