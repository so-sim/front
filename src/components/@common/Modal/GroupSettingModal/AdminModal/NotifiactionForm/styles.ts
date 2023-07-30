import styled from '@emotion/styled';

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  padding-left: 16px;
  height: 662px;
`;

export const Notice = styled.div`
  padding: 8px 0;
  margin: 0 0 0 8px;
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_600};
  ${({ theme }) => theme.font.body_01}
`;

export const ToggleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const EnabledBox = styled.div<{ enabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.6)};
  pointer-events: ${({ enabled }) => !enabled && 'none'};
`;

export const TabTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_03}
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  margin-bottom: 4px;
  /* background-color: ${({ theme }) => theme.colors.neutral_200_b}; */
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_01}
`;

export const TabButtonBox = styled.ul`
  display: flex;
  flex: 1;
  width: 100%;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const PeriodTypeButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex: 1;
  width: 50px;
  padding: 8px 0;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.secondary_100 : '')};
`;

export const StartDateOfNotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 8px;
  margin-bottom: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const TabBlock = styled.li`
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;
