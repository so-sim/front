import styled from '@emotion/styled';

export const TableHead = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100px 120px 116px 108px 1fr;
  border: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  margin-bottom: 4px;
  & > span {
    padding: 8px 16px;
  }
`;