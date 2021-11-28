import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { AnimateSharedLayout } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../logic/redux/store';
import AppWrapper from '../components/layouts/AppWrapper';
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <AnimateSharedLayout>
      <Provider store={store}>
        <SessionProvider session={session}>
          <AppWrapper>
            <Component {...pageProps} key={router.route} />
          </AppWrapper>
        </SessionProvider>
      </Provider>
    </AnimateSharedLayout>
  );
}
export default MyApp;
