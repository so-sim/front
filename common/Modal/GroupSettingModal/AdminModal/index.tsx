import { FC, useState } from 'react';
import { Input, Label } from '@/common';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import theme from '@/styles/Theme';
import { isValid } from '@/utils/validation';
import { GroupColorList } from '../../GroupColorList';
import { DropBox } from '../../../DropBox';
import { QuitGroup } from '../../QuitGroup';
import * as Style from './style';
import { COLORS, DROPDOWN_LIST } from '@/constants';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useUpdateGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupColor } from '@/types/group';

export const AdminModal: FC<ModalHandlerProps> = ({ isOpen, modalHandler }) => {
  const [groupName, setGroupName] = useState('모임이름');
  const [myName, setMyName] = useState('내이름');
  const [type, setType] = useState('스터디');
  const [color, setColor] = useState<GroupColor>('#f86565');

  const { groupId } = useParams();

  const { mutate: updateGroupMutate } = useUpdateGroup();

  const updateGroupInfo = () => {
    const id = Number(groupId);
    updateGroupMutate({ title: groupName, type, coverColor: color, groupId: id });
    modalHandler();
  };

  const isValidForm = () => {
    if (!isValid(groupName)) return false;
    if (!isValid(myName)) return false;
    if (type === '') return false;
    if (!COLORS.includes(color)) return false;
    return true;
  };

  return (
    <Modal.Frame isOpen={isOpen} onClick={modalHandler} width="492px" height="708px">
      <Modal.Header align="start" onClick={modalHandler}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', width: '100%' }}>
          <Style.SubTitle>사용자 설정</Style.SubTitle>
          <div style={{ width: '100%', borderLeft: `2px solid ${theme.colors.neutral_400_b}`, paddingLeft: '16px' }}>
            <Label title="모임 이름" flexDirection="column">
              <Input value={groupName} isValid={isValid(groupName)} onChange={setGroupName} maxLength={15} />
            </Label>
            <Label title="내 이름" flexDirection="column">
              <Input value={myName} isValid={isValid(myName)} onChange={setMyName} maxLength={15} />
            </Label>
            <Label title="모임 유형" flexDirection="column">
              <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} />
            </Label>
            <Label title="커버 색상" flexDirection="column">
              <GroupColorList value={color} onChange={setColor} />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column">
              <QuitGroup />
            </Label>
            <div style={{ display: 'flex' }}>
              <Style.DeleteButton>모임 삭제</Style.DeleteButton>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white" onClick={modalHandler}>
            취소
          </Button>
          <Button color={isValidForm() ? 'black' : 'disabled'} onClick={updateGroupInfo}>
            저장
          </Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
