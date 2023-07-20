import 'react-native-gesture-handler';
//
import { useEffect } from 'react'
import Root from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/ReduxStore';
import { SafeAreaView, Text } from 'react-native';
import AppContext from './app/context';
import messaging from '@react-native-firebase/messaging';
import { fetchPostAuthData } from './app/API';
import { formDataGenerator } from './app/utils';
//
export default function App() {
  //
  async function requestUserPermission() {
    //
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    //
  }
  //
  useEffect(() => {
    if (requestUserPermission()) {
      // return fcm token for the device
      messaging().getToken().then(token => {
        console.log("Token----------", token);
        try {
          const payload = { fcm: token };
          const formData = formDataGenerator(payload);
          fetchPostAuthData('buyer/user/updateFCM', formData)
            .then(res => console.log("Token------------>", res));
        } catch (error) {
          console.log("Error happen when updating FCM Token in App.js");
        }
      })
    }
    else {
      console.log("Failed Token Status", authStatus);
    }
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    //
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
    // end
  }, []);

  return (
    <Provider store={store}>
      <AppContext>
        <Root />
      </AppContext>
    </Provider>
  );
}
//