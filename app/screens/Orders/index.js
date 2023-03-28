import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import OrdersScreen from './_main';
import CheckOutScreen from './check_out';
import AddressesScreen from './AddressesScreen';
//
const Stack = createNativeStackNavigator();
//
const OrdersStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />
            <Stack.Screen name="AddressesScreen" component={AddressesScreen} />
        </Stack.Navigator>
    )
}

export default OrdersStack;

