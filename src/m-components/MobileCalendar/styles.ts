import styled from '@emotion/styled';

export const DateControllerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DateText = styled.div`
  margin-right: 12px;
  white-space: nowrap;
  ${({ theme }) => theme.font.subhead_03}
`;

export const ArrowBlock = styled.div`
  display: flex;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  &:first-of-type {
    border-right: none;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const ToolTipIconWrapper = styled.div`
  margin-left: auto;
`;

export const DayOfTheWeekWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(48px, 1fr));
  margin: 0.5rem 0;
`;

export const DayOfTheWeekText = styled.p`
  padding: 0.5rem 0.675rem;

  text-align: center;

  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const CalendarWrapper = styled.div<{ $length: number }>`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.$length},minmax(80px,1fr))`};
`;

export const WeekWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(48px, 1fr));
  border-top: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  padding: 0.75rem 0.25rem;
  text-align: center;
`;

export const DateTitle = styled.p`
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 2rem;
  right: 1rem;

  width: 3.25rem;
  height: 3.25rem;

  border: 2px solid ${({ theme }) => theme.colors.primary_400};
  border-radius: 999px;

  background-color: ${({ theme }) => theme.colors.primary_500};
  color: white;
`;
