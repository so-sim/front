import { AdminModal } from '@/components/@common/Modal/GroupSettingModal/AdminModal';
import { UserModal } from '@/components/@common/Modal/GroupSettingModal/UserModal';
import { useGroupDetail } from '@/queries/Group';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import { USER } from '../../../../assets/icons/User';
import * as Style from './styles';

const GROUP_TAPS = [
  { title: '홈', svg: SYSTEM.HOME, disabled: true, link: 'home' },
  { title: '공지사항', svg: SYSTEM.NOTICE, disabled: true, link: 'notice' },
  { title: '벌금 장부', svg: SYSTEM.ARTICLE, disabled: false, link: 'book' },
];
const ETC = [
  { title: '멤버 관리', svg: USER.GROUP_LG, link: 'member', id: 'member_setting' },
  { title: '설정', svg: SYSTEM.SETTING_LG, id: 'group_setting' },
];

const GroupSideBar = () => {
  const [showGroupSettingModal, setShowGroupSettingModal] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const { groupId } = param;

  const { data: groupData, isError } = useGroupDetail(Number(groupId));

  const isSelected = (link: string) => {
    return param['*']?.split('/').includes(link) === true;
  };

  const handleGroupSettingModal = () => {
    setShowGroupSettingModal((prev) => !prev);
  };

  useEffect(() => {
    if (groupData && !groupData.content.isInto) {
      navigate('/');
    }
    if (!groupData && isError) {
      navigate('/');
    }
  }, [groupId, isError, groupData?.content.isInto]);

  return (
    <>
      <Style.Layout>
        <Style.Header>{groupData?.content.title}</Style.Header>
        <Style.TapContainer>
          <Style.Category>벌금 관리</Style.Category>
          {GROUP_TAPS.map((tap) => (
            <NavLink to={`/group/${groupId}/${tap.link}`} key={tap.title}>
              <Style.Selected isSelected={isSelected(tap.link)} />
              <Style.Tap disabled={tap.disabled}>
                <div style={{ height: '24px' }}>{tap.svg}</div>
                <span>{tap.title}</span>
              </Style.Tap>
            </NavLink>
          ))}
        </Style.TapContainer>
        <Style.TapContainer>
          <Style.Category>기타</Style.Category>
          {ETC.map((etc) =>
            etc.link ? (
              <NavLink to={`/group/${groupId}/${etc.link}`} key={etc.title} id={etc.id}>
                <Style.Selected isSelected={isSelected(etc.link)} />
                <Style.Tap key={etc.title}>
                  <div style={{ height: '24px' }}>{etc.svg}</div>
                  <span>{etc.title}</span>
                </Style.Tap>
              </NavLink>
            ) : (
              <Style.Tap key={etc.title} onClick={handleGroupSettingModal} id={etc.id}>
                <div style={{ height: '21px' }}>{etc.svg}</div>
                <span>{etc.title}</span>
              </Style.Tap>
            ),
          )}
        </Style.TapContainer>
      </Style.Layout>
      {groupData?.content.isAdmin && showGroupSettingModal && <AdminModal modalHandler={handleGroupSettingModal} />}
      {!groupData?.content.isAdmin && showGroupSettingModal && <UserModal modalHandler={handleGroupSettingModal} />}
    </>
  );
};

export default GroupSideBar;