import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  ${({ theme }) => theme.font.display_01}
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${isMobile ? '4px' : '12px'};
`;

export const CoverColor = styled.span<{ coverColor: string }>`
  width: 24px;
  height: 24px;
  background-color: ${({ coverColor }) => coverColor};
`;

export const GroupName = styled.div`
  ${({ theme }) => theme.font.subhead_04};
  margin-bottom: ${isMobile ? '12px' : '20px'};
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: ${isMobile ? '24px' : '32px'};
`;
