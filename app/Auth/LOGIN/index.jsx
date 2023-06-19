import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginScreen from './_main';
import ForgotPasswordScreen from './Forgot-password';
import ChangePasswordScreen from './Change-Password';
import Login_OTP_Screen from './LoginOTP';

// global variables
const Stack = createNativeStackNavigator();
// Login Stack
const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="LoginOTP" component={Login_OTP_Screen} />
        </Stack.Navigator>
    )
}
// export module
export default LoginStack;

