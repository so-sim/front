import { Situation } from '@/types/event';
import styled from '@emotion/styled';

type CircleDropButtonProps = { situation: Situation };

export const StatusButton = styled.button<CircleDropButtonProps>`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  margin: 8px 10px;
  border-radius: 16px;
  color: ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_600 : situation === '확인중' ? theme.colors.orange_600 : theme.colors.primary_600)};
  border: 2px solid ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_600 : situation === '확인중' ? theme.colors.orange_600 : theme.colors.primary_600)};
  background-color: ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_200 : situation === '확인중' ? theme.colors.orange_200 : theme.colors.blue_200)};
`;

export const Text = styled.span`
  display: flex;
  justify-content: flex-start;
  ${({ theme }) => theme.font.subhead_01}
  width: 52px;
  margin-right: 4px;
`;

export const Icon = styled.span`
  width: 16px;
  height: 16px;
`;