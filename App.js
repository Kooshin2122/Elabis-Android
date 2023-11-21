import 'react-native-gesture-handler';
//
import { useEffect } from 'react'
import Root from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/ReduxStore';
import { SafeAreaView, Text } from 'react-native';
import AppContext, { useAppContext } from './app/context';
import { fetchPostAuthData } from './app/API';
import { formDataGenerator } from './app/utils';
import { readData, storeData } from './app/utils/localStorage/AsyncStorage';
//
export default function App() {
  //

  //
  return (
    <Provider store={store}>
      <AppContext>
        <Root />
      </AppContext>
    </Provider>
  );
}
//