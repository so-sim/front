import { logRoles } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Route } from 'react-router-dom';
import GroupLayout from '..';
import { FakeGroups } from '../../../tests/groupData';
import { useRender } from '../../../tests/useRender';
import { setupServer } from 'msw/node';
import { groupHandler } from '../../../mocks/api/groupHandler';
import GroupList from '../components/GroupList';

describe('groupLayout test', () => {
  const server = setupServer(...groupHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('그룹 리스트를 불러와 리스트 카드를 보여준다', async () => {
    useRender(<Route path="*" element={<GroupLayout />} />);

    await waitFor(() => screen.findByRole('button', { name: '테스1' }));
    const groupListButton = screen.getAllByRole('button', { name: /테스/i });
    expect(groupListButton).toHaveLength(FakeGroups.length);
  });

  test('그룹 버튼을 누르면, 해당 그룹에 대한 정보를 보여준다', async () => {
    const user = userEvent.setup();
    useRender(
      <>
        <Route path="*" element={<GroupLayout />} />
        <Route path="/group/:groupID/*" element={<GroupLayout />} />
      </>,
    );
    await waitFor(() => screen.findByRole('button', { name: '테스1' }));
    const linkButton = screen.getByRole('button', { name: '테스2' });
    await user.click(linkButton);
    const groupName = await screen.findByRole('heading', { name: '테스2' });
    expect(groupName).toBeInTheDocument();
  });

  test('선택된 그룹을 제외한 나머지 그룹은 커버가 씌워진다', async () => {
    const { container } = useRender(<Route path="/group/:groupID/*" element={<GroupList />} />, '/group/1/*');

    await waitFor(() => screen.findByRole('button', { name: '테스1' }));
    const coverList = screen.getAllByRole('presentation');
    expect(coverList).toHaveLength(FakeGroups.length - 1);
  });

  test(' +버튼을 누르면 그룹 생성 모달이 나타난다', async () => {
    const { container } = useRender(<Route path="*" element={<GroupList />} />, '/group/1/*');
    const user = userEvent.setup();

    await waitFor(() => screen.findByRole('button', { name: '테스1' }));
    const createButton = screen.getByRole('button', { name: 'GroupCreate' });
    await user.click(createButton);

    const createModal = await screen.findByText('모임 생성');
    expect(createModal).toBeInTheDocument();
  });
});
