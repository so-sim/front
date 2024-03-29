import styled from '@emotion/styled';

export const Date = styled.div<DateProps>`
  ${({ theme }) => theme.font.subhead_02}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 30px;
  background-color: ${(props) => (props.isToday ? props.theme.colors.neutral_300_b : props.theme.colors.white)};
  color: ${(props) => {
    if (!props.isCurrentMonth) {
      return props.theme.colors.secondary_400;
    } else {
      return props.theme.colors.secondary_900;
    }
  }};
`;

export const DateCell = styled.div<DateProps>`
  cursor: pointer;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  gap: 4px;
  min-height: 118px;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;

  &:hover {
    ${Date} {
      background-color: ${(props) => (props.isToday ? props.theme.colors.neutral_400_b : props.theme.colors.neutral_200_b)};
    }
  }
`;

interface DateProps {
  isToday: boolean;
  isSelectedDate?: boolean;
  isCurrentMonth?: boolean;
}

interface TagProps {
  color: 'blue' | 'orange' | 'red';
}

export const Tag = styled.div<TagProps>`
  display: flex;
  width: fit-content;
  font-size: 16px;
  gap: 4px;
  text-align: center;
  align-items: center;

  padding: 0 12px;
  height: 32px;
  border: 2px solid;
  border-radius: 20px;
  border-color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.primary_600,
      red: theme.colors.red_600,
      orange: theme.colors.orange_600,
    };
    return colors[color];
  }};
  color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.primary_600,
      red: theme.colors.red_600,
      orange: theme.colors.orange_600,
    };
    return colors[color];
  }};
  background-color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.neutral_200_b,
      red: theme.colors.red_200,
      orange: theme.colors.orange_200,
    };
    return colors[color];
  }};

  span {
    ${({ theme }) => theme.font.subhead_02}
  }

  @media (max-width: 1718px) {
    font-size: 12px;
    padding: 8px;
    gap: 2px;
  }
`;
