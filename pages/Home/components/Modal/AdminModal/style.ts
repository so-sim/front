import styled from '@emotion/styled';

export const Title = styled.div`
  margin-bottom: 16px;
`;

export const SubTitle = styled.div`
  ${({ theme }) => theme.font.subhead_03};
  margin: 4px 20px 0 4px;
  width: 92px;
  white-space: nowrap;
`;

export const ButtonFrame = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;

export const DeleteButton = styled.button`
  ${({ theme }) => theme.font.subhead_01};
  padding: 8px 14px;
  border-radius: 4px;
  margin-top: 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;