import useWindowHeight from '@/hooks/@common/useWindowHeight';
import { useGroupDetail } from '@/queries/Group';
import React from 'react';
import { useParams } from 'react-router-dom';
import MobileHeader from './components/MobileHeader';
import * as Style from './styles';

type Props = {
  left: { icon: JSX.Element; onClick: () => void };
  title: JSX.Element | string;
  children: React.ReactNode;
};

const ModalPageLayout = ({ left, title, children }: Props) => {
  const { windowRef } = useWindowHeight();
  const { groupId } = useParams();
  const { data } = useGroupDetail(Number(groupId));

  return (
    <Style.Layout ref={windowRef}>
      <MobileHeader left={{ onClick: left.onClick, icon: left.icon }} title={title} />
      <div style={{ padding: '0 16px 32px 16px' }}>{children}</div>
    </Style.Layout>
  );
};

export default ModalPageLayout;
