import React, { Suspense, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import { USER } from '../../../../assets/icons/User';
import Modal from '../../../../common/Modal';
import useGroupQuery from '../../../../queries/Group/useGroupQuery';
import * as Style from './styles';

const GROUP_TAPS = [
  { title: '홈', svg: SYSTEM.HOME, disabled: true, link: 'home' },
  { title: '공지사항', svg: SYSTEM.NOTICE, disabled: true, link: 'notice' },
  { title: '벌금 장부', svg: SYSTEM.ARTICLE, disabled: false, link: 'book' },
];
const ETC = [
  { title: '맴버 관리', svg: USER.GROUP_LG, link: 'member' },
  { title: '설정', svg: SYSTEM.SETTING_LG },
];

const GroupSideBar = () => {
  const param = useParams();
  const { groupID } = param;
  const [showEditModal, setShowEditModal] = useState(false);

  const handelEditModal = () => {
    setShowEditModal((prev) => !prev);
  };

  const isSelected = (link: string) => {
    return param['*']?.split('/').includes(link) === true;
  };

  const { data: groupData } = useGroupQuery(groupID);

  return (
    <>
      <Suspense fallback={<div>loading....</div>}>
        <Style.Layout>
          <Style.Header>
            <h1>{groupData?.title}</h1>
          </Style.Header>
          <Style.TapContainer>
            <span>벌금 관리</span>
            {GROUP_TAPS.map((tap) => (
              <NavLink to={`/group/${groupID}/${tap.link}`} key={tap.title}>
                <Style.Selected isSelected={isSelected(tap.link)} />
                <Style.Tap disabled={tap.disabled}>
                  <div>{tap.svg}</div>
                  <span>{tap.title}</span>
                </Style.Tap>
              </NavLink>
            ))}
          </Style.TapContainer>
          <Style.TapContainer>
            <span>기타</span>
            {ETC.map((etc) =>
              etc.link ? (
                <NavLink to={`/group/${groupID}/${etc.link}`} key={etc.title}>
                  <Style.Selected isSelected={isSelected(etc.link)} />
                  <Style.Tap key={etc.title}>
                    <div>{etc.svg}</div>
                    <span>{etc.title}</span>
                  </Style.Tap>
                </NavLink>
              ) : (
                <Style.Tap key={etc.title} onClick={handelEditModal}>
                  <div>{etc.svg}</div>
                  <span>{etc.title}</span>
                </Style.Tap>
              ),
            )}
          </Style.TapContainer>
        </Style.Layout>
      </Suspense>
      <Modal.Frame isOpen={showEditModal} onClick={handelEditModal}>
        <div>EditModal</div>
      </Modal.Frame>
    </>
  );
};

export default GroupSideBar;
