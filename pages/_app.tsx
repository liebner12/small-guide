import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { AnimateSharedLayout } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../logic/redux/store';
import AppWrapper from '../components/layouts/AppWrapper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'ononline' in window &&
      'onoffline' in window
    ) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false);
        });
      }
    }
  }, []);

  const routerUsed = useRouter();
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      (window as any).workbox !== undefined &&
      isOnline
    ) {
      // skip index route, because it's already cached under `start-url` caching object
      if (routerUsed.route !== '/') {
        const wb = (window as any).workbox;
        wb.active.then(() => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' });
        });
      }
    }
  }, [isOnline, routerUsed.route]);
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
