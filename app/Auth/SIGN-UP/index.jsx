import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import SignUpScreen from './_main';
import OTP_Screen from './OTP';
// global variables
const Stack = createNativeStackNavigator();
// SignUp Stack;
const SignUpStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="OTP" component={OTP_Screen} />
        </Stack.Navigator>
    )
}
// export module
export default SignUpStack;

