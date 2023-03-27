import React from 'react';
import BotomTabs from './BottomTabs';
import AuthStack from '../screens/Auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// global variables
const Stack = createNativeStackNavigator();
//
const Root = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BottomTabs" component={BotomTabs} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
//
export default Root;

