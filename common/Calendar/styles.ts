import styled from '@emotion/styled';

export const Layout = styled.div`
  padding: 48px 32px;
  width: 100%;
  height: calc(100vh - 68px);
  overflow-y: auto;
`;

export const Title = styled.span`
  ${({ theme }) => theme.font.body_02}
`;

export const Header = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 12px;
  div {
    display: flex;
    align-items: center;
  }
`;

export const DateHeader = styled.div`
  margin-right: 12px;
  white-space: nowrap;
  ${({ theme }) => theme.font.headline}
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const WeekDate = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  margin-bottom: 12px;
  min-width: 200px;
  div {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    ${({ theme }) => theme.font.subhead_02}
  }
`;

interface CalendarContainerProps {
  length: number;
  mini: boolean;
}

export const CalendarContainer = styled.div<CalendarContainerProps>`
  display: grid;
  max-height: ${(props) => (props.mini ? '50%' : '100%')};
  grid-template-rows: ${(props) => `repeat(${props.length},1fr`};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

interface WeekWrapProps {
  cellType: 'Mark' | 'Tag';
}

export const WeekWrap = styled.div<WeekWrapProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-height: ${(props) => props.cellType === 'Mark' && '80px'};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  div {
    overflow: hidden;
    white-space: nowrap;
  }
`;
