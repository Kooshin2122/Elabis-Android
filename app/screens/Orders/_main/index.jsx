//
import React from 'react';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { Header, Devider } from '../../../components';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import MaterialTopTabs from './screens';

const OrdersScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header label="Orders" />
            <MaterialTopTabs />
        </SafeAreaView>
    )
}

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    }
})
