// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import store from '@/features/store';
import ModalContainer from '@/components/common/Modal/ModalContainer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <div id="modal" />
      <ModalContainer />
    </Provider>
  );
}
