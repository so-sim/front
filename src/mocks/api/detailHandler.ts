import { EventInfo } from '@/types/event';
import { rest } from 'msw';

const randomId = () => Math.floor(Math.random() * 1000000);

const details: EventInfo[] = [
  { userId: randomId(), eventId: randomId(), groundsDate: '23.02.22', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.03.22', paymentType: 'non', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.15', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.08', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.29', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.22', paymentType: 'non', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.02.22', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.03.22', paymentType: 'non', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.15', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.08', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.29', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.02.22', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.03.22', paymentType: 'non', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.15', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.08', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.29', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.22', paymentType: 'non', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.02.22', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.03.22', paymentType: 'non', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.15', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.08', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23.01.29', paymentType: 'full', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
];

const createDetail: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  const detail = await req.json();

  return res(
    ctx.json(detail),
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '상세 내역이 성공적으로 생성되었습니다.',
      },
      content: {
        eventId: 124123214,
      },
    }),
  );
};

const getDetailList: Parameters<typeof rest.post>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '상세 내역 목록이 성공적으로 조회되었습니다.',
      },
      content: details,
    }),
  );
};

const updateDetailStatus: Parameters<typeof rest.patch>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '납부 여부가 성공적으로 변경되었습니다.',
      },
      content: details[1],
    }),
  );
};

export const detailHandler = [rest.post('/api/event/penalty', createDetail), rest.get('/api/event/penalty', getDetailList), rest.patch('/api/event/penalty/*', updateDetailStatus)];