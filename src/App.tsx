import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Toast, { ToastPopUp } from './components/@common/Toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { TOAST_ERROR } from './constants/Toast';
import { GlobalConfirmModal } from './components/@common/Modal/ConfirmModal';
import MobileRouter from './routes/MobileRouter';
import { BrowserRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 2,
        onError: (error) => {
          const { response } = error as unknown as AxiosError;
          if (response?.status !== 401) {
            ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
          }
        },
      },
      queries: {
        retry: 2,
        onError: (error) => {
          const { response } = error as unknown as AxiosError;
          if (response?.status !== 401 && response?.status !== 400) {
            ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
          }
        },
      },
    },
  });

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <MobileRouter />
            <Router />
          </BrowserRouter>
          <Toast />
          <GlobalConfirmModal />
          <Global styles={globalStyle} />
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} /> */}
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
