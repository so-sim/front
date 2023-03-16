import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/common/DropDown';
import { useChangeAdmin, useGroupDetail } from '@/queries/Group';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChangeAdminModal from '../../../../common/Modal/ChangAdminModal';
import * as Style from './styles';

interface MemberListItemProps {
  nickname: string;
}

const DropDonwList = [
  { title: '총무 넘기기', svg: SYSTEM.SETTING_SM },
  // { title: '퇴출', svg: SYSTEM.LOGOUT },
];

const MemberListItem: FC<MemberListItemProps> = ({ nickname }) => {
  const { groupId } = useParams();
  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectAction, setSelectAction] = useState('');
  const [showChangeAdminModal, setShowChangeAdminModal] = useState(false);

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };
  const handleShowChangeAdminModal = () => {
    setShowChangeAdminModal((prev) => !prev);
  };

  const { mutate: changeAdminMutate } = useChangeAdmin();

  const onClickConfirm = () => {
    const id = Number(groupId);
    changeAdminMutate({ groupId: id, nickname });
    handleShowChangeAdminModal();
  };

  useEffect(() => {
    if (selectAction === '총무 넘기기') {
      handleShowChangeAdminModal();
    }
    setSelectAction('');
  }, [selectAction]);

  return (
    <>
      <Style.MemberContainer>
        <Style.Flex>
          <div>{USER.PERSON_XL}</div>
          <span>{nickname}</span>
        </Style.Flex>
        {groupData?.content.isAdmin && (
          <Style.SVG>
            <div onClick={handleDropDown}>
              {SYSTEM.DOTS}
              {showDropDown && <DropDown list={DropDonwList} top={'30px'} onClose={handleDropDown} setState={setSelectAction} width={104} />}
            </div>
          </Style.SVG>
        )}
      </Style.MemberContainer>
      {showChangeAdminModal && <ChangeAdminModal modalHandler={handleShowChangeAdminModal} onClickConfirm={onClickConfirm} />}
    </>
  );
};

export default MemberListItem;