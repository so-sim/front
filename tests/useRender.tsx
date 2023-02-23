import { ThemeProvider } from '@emotion/react';
import theme from '../styles/Theme';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ThemeHOC = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export const useRender = (children: JSX.Element | JSX.Element[], initailEntry = '/') => {
  const testQueryClient = createTestQueryClient();
  return render(
    <ThemeHOC>
      <QueryClientProvider client={testQueryClient}>
        <MemoryRouter initialEntries={[initailEntry]}>
          <Routes>{children}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeHOC>,
  );
};

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
};
