// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { server } from '@/mocks/server';
import { QueryCache } from '@tanstack/react-query';
import { matchers } from '@emotion/jest';
import 'react-toastify/dist/ReactToastify.css';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import 'intersection-observer';

expect.extend(matchers);

const queryCache = new QueryCache();

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());
