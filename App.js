import 'react-native-gesture-handler';
//
import Root from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/ReduxStore';
import { SafeAreaView, Text } from 'react-native';
import AppContext from './app/context';
//
export default function App() {
  return (
    <Provider store={store}>
      <AppContext>
        <Root />
      </AppContext>
    </Provider>
  );
}

