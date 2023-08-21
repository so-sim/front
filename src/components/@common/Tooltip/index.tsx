import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import React, { useState } from 'react';
import * as Style from './styles';

export type Location = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type TooltipProps = {
  title: string;
  contents: JSX.Element[];
  width: number;
  location: Location;
  trigger: JSX.Element;
  messageBox: {
    left?: string;
    top?: string;
  };
  left?: string;
  top?: string;
  defaultValue?: boolean;
};

export const Tooltip = ({ title, contents, width, location, trigger, left = '0px', top = '0px', defaultValue = false, messageBox }: TooltipProps) => {
  const [page, setPage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(defaultValue);

  const onClose = () => {
    setShowTooltip((prev) => !prev);
  };

  const openTooltip = () => {
    setShowTooltip(true);
  };

  return (
    <span>
      {showTooltip && (
        <div style={{ position: 'absolute', left, top }}>
          <Style.Arrow top={messageBox.top || '0'} left={messageBox.left || '0'} location={location}>
            {ARROW.TOOLTIP}
          </Style.Arrow>
          <Style.Frame width={width}>
            <Header title={title} onClose={onClose} />
            <Body contents={contents} page={page} />
            <Footer contents={contents} page={page} setPage={setPage} onClose={onClose} />
          </Style.Frame>
        </div>
      )}
      {/* 트리거에 의해서 열리는 아이가 존재하는 반면, 그냥 달려있기 위해서 존재하는 아이들이 있음 */}
      <span onClick={openTooltip}>{trigger}</span>
    </span>
  );
};

const Header = ({ title, onClose }: Pick<TooltipProps, 'title'> & { onClose: VoidFunction }) => {
  return (
    <Style.Header>
      <div>{title}</div>
      <div onClick={onClose}>{SYSTEM.CLOSE_SM_WHITE}</div>
    </Style.Header>
  );
};

type BodyProps = Pick<TooltipProps, 'contents'> & { page: number };

const Body = ({ contents, page }: BodyProps) => {
  return <div>{contents[page]}</div>;
};

type FooterProps = Pick<TooltipProps, 'contents'> & { page: number; setPage: React.Dispatch<React.SetStateAction<number>>; onClose: VoidFunction };

const Footer = ({ contents, page, setPage, onClose }: FooterProps) => {
  const buttonText = (page: number) => {
    if (page === contents.length - 1) return '닫기';
    return '다음';
  };

  const handleNext = () => {
    if (page >= contents.length - 1) return onClose();
    setPage((prev) => prev + 1);
  };

  return (
    <Style.Footer>
      <Style.Pagination>
        {contents.map((_, index) => (
          <Style.Page onClick={() => setPage(index)} isActive={page === index} />
        ))}
      </Style.Pagination>
      <Style.NextButton onClick={handleNext}>{buttonText(page)}</Style.NextButton>
    </Style.Footer>
  );
};