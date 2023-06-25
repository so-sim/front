import { Situation } from '@/types/event';
import { KeyValueObject } from '@/types/global';

export const pushDataLayer = (event: string, data: KeyValueObject) => {
  window.dataLayer.push({ event, ...data });
};

export const pushDataLayerByStatus = (isAdmin: boolean, situation: Situation) => {
  if (isAdmin === false && situation === '확인중') {
    pushDataLayer('confirming', { route: 'list' });
  }
  if (isAdmin === true && situation === '완납') {
    pushDataLayer('fullpayment', { route: 'list' });
  }
};
