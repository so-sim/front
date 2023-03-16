import { rest } from 'msw';

const groupList = [
  { title: '전국 노래 자랑', admin: '윤하나둘셋넷', coverColor: '#f86565', groupId: '1' },
  { title: '전국 노래 자랑', admin: '윤하나', coverColor: '#f86565', groupId: '2' },
  { title: '전국 노래 자랑', admin: '윤둘', coverColor: '#f86565', groupId: '3' },
  { title: '전국 노래 자랑', admin: '윤셋', coverColor: '#f86565', groupId: '4' },
  { title: '전국 노래 자랑', admin: '윤넷', coverColor: '#f86565', groupId: '5' },
  { title: '전국 노래 자랑', admin: '윤하나둘', coverColor: '#f86565', groupId: '6' },
  { title: '전국 노래 자랑', admin: '윤하나셋넷', coverColor: '#f86565', groupId: '7' },
  { title: '전국 노래 자랑', admin: '윤둘셋넷', coverColor: '#f86565', groupId: '8' },
  { title: '전국 노래 자랑', admin: '윤하나둘넷', coverColor: '#f86565', groupId: '9' },
];

const getGroupList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: 'success',
      },
      content: {
        index: 0,
        next: false,
        groupList,
      },
    }),
  );
};

const getGroupDetail: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '모임이 성공적으로 조회되었습니다.',
      },
      content: {
        title: '전국 노래 자랑',
        adminNickname: '윤하나둘셋넷',
        createDate: '',
        updateDate: '',
        coverColor: '#f86565',
        groupType: '학교, 교내/외 모임',
        isAdmin: false,
      },
    }),
  );
};

const getGroupParticipant: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.json({
      status: {
        code: 200,
        message: '모임 참가자 리스트가 정상적으로 조회되었습니다.',
      },
      content: {
        adminId: '125hlkfd',
        adminNickname: '윤하나둘셋넷',
        nicknameList: ['윤하나둘셋넷', '윤하나', '윤둘', '윤셋', '윤넷', '윤하나둘', '윤하나셋넷', '윤둘셋넷', '윤하나둘넷'],
      },
    }),
  );
};

const createGroup: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  const body = await req.json();
  groupList.push(body);
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '모임이 성공적으로 생성되었습니다.',
      },
      content: {
        group_id: '10',
      },
    }),
  );
};

const modifyGroup: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  return res(ctx.status(201));
};

const deleteGroup: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '모임이 성공적으로 삭제되었습니다.',
      },
      content: null,
    }),
  );
};

const joinGroup: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '모임에 성공적으로 참가되었습니다.',
      },
      content: null,
    }),
  );
};

const changeAdmin: Parameters<typeof rest.patch>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '관리자가 성공적으로 변경되었습니다.',
      },
      content: null,
    }),
  );
};

const withdrawalGroup: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '성공적으로 모임에서 탈퇴되었습니다.',
      },
      content: null,
    }),
  );
};

const changeNickname: Parameters<typeof rest.patch>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '성공적으로 닉네임이 수정되었습니다.',
      },
      content: null,
    }),
  );
};

const getMyNikckname: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '성공적으로 닉네임을 조회했습니다',
      },
      content: {
        nickname: '유저 닉네임',
      },
    }),
  );
};

export const groupHandler = [
  rest.get('/api/groups', getGroupList),
  rest.get('/api/group/1', getGroupDetail),
  rest.get('/api/group/1/participants', getGroupParticipant),
  rest.post('/api/group', createGroup),
  rest.post('/api/group/1/participant', joinGroup),
  rest.put('/api/group/1', modifyGroup),
  rest.patch('/api/group/admin/1', changeAdmin),
  rest.patch('/api/participant/1', changeNickname),
  rest.delete('/api/group/1', deleteGroup),
  rest.delete('/api/group/1', withdrawalGroup),
  rest.get('/api/group/1/participant', getMyNikckname),
];
