import React, { Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import Modal from '../../../../common/Modal';
import useGroupListQuery from '../../../../queries/Group/useGroupListQuery';
import * as Stlye from './styles';

const GroupList = () => {
  const param = useParams();
  const { groupID } = param;
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(true);

  const handleCreateModal = () => {
    setShowCreateModal((prev) => !prev);
  };

  const isSelected = (id: string) => {
    return groupID === id;
  };

  const switchGroup = (id: string) => {
    navigate(`/group/${id}/book`);
  };
  const { data: groupList } = useGroupListQuery();

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Stlye.Layout>
          {groupList?.map((group) => (
            <div key={group.id}>
              <Stlye.Cover isSelected={isSelected(group.id)} role="presentation" />
              <Stlye.EachGroup color={group.coverColor} onClick={() => switchGroup(group.id)}>
                {group.title.substring(0, 3)}
              </Stlye.EachGroup>
            </div>
          ))}
          <Stlye.CreateButton onClick={handleCreateModal} title="GroupCreate">
            {SYSTEM.PLUS_GRAY}
          </Stlye.CreateButton>
        </Stlye.Layout>
      </Suspense>
      <Modal.Frame isOpen={showCreateModal} onClick={handleCreateModal}>
        <h1>모임 생성</h1>
      </Modal.Frame>
    </>
  );
};

export default GroupList;
