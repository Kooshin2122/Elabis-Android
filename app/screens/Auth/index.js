import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginStack from './LOGIN';
import SignUpStack from './SIGN-UP';
// global variables
const Stack = createNativeStackNavigator();
// SignUp Stack;
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginStack" component={LoginStack} />
            <Stack.Screen name="SignUpStack" component={SignUpStack} />
        </Stack.Navigator>
    )
}
// export module
export default AuthStack;

