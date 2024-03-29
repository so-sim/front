import styled from '@emotion/styled';

export const Title = styled.div`
  width: 100%;
  display: flex;
`;

export const Flex = styled.div`
  display: flex;
`;

export const SubTitle = styled.span`
  ${({ theme }) => theme.font.subhead_03};
  white-space: nowrap;
  margin-right: 20px;
`;

export const InputContainer = styled.div`
  width: 100%;
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  padding-left: 16px;
`;

export const ButtonFrame = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;

export const WithDrwal = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
`;

export const GroupName = styled.div`
  display: flex;
  width: 226px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 2px;
  ${({ theme }) => theme.font.body_02}
`;

export const QuitButton = styled.button`
  ${({ theme }) => theme.font.subhead_01};
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 6px 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;
