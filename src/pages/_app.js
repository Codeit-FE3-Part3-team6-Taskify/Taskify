// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import store from '@/features/store';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
