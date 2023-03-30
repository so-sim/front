import { KeyValueObject } from '@/types/global';

export const pushDataLayer = (event: string, data: KeyValueObject) => {
  window.dataLayer.push({ event, ...data });
};