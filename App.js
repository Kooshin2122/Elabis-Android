//
import Root from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/ReduxStore';

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

