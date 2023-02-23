import { rest } from 'msw';
import { BASE_URL } from '../../api';
import { FakeGroups } from '../../tests/groupData';

export const groupHandler = [
  rest.get(`${BASE_URL}/group`, (req, res, ctx) => {
    const groupId = req.url.searchParams.get('id');

    const result = FakeGroups.filter((group) => group.id === groupId)[0];
    return res(ctx.json(result));
  }),

  rest.get(`${BASE_URL}/groups`, (req, res, ctx) => {
    return res(ctx.json(FakeGroups));
  }),
];
