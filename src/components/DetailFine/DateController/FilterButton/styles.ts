import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const FilterButton = styled.button<{ isActive: boolean; isFirst: boolean; isLast: boolean }>`
  width: 56px;
  height: 32px;
  ${({ theme }) => theme.font.subhead_01}

  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.neutral_300_b : '')};
  color: ${({ theme }) => theme.colors.secondary_900};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }

  ${({ isLast, theme }) =>
    !isLast &&
    css`
      border-right: 1px solid ${theme.colors.neutral_400_b};
    `}

  ${({ isFirst }) => isFirst && 'border-radius: 3px 0 0 3px'};
  ${({ isLast }) => isLast && 'border-radius: 0 3px 3px 0'};
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArrowIcon = styled.span`
  height: 16px;
`;

export const DropDownWrapper = styled.div`
  position: relative;
  left: 1px;
`;

export const FilterWrapper = styled.div`
  position: relative;
  white-space: nowrap;
`;
