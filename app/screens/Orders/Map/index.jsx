//
import React from 'react';
import { SubHeader } from '../../../components';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const MapScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Track Order" />
        </SafeAreaView>
    )
}

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    }
})
