import React from 'react'
import { useSelector } from 'react-redux';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandSection, CategoriesSection, MainProductHeader } from './components';

const MainProductsScreen = () => {
    const { activeTab } = useSelector((state) => state.productsSlice);
    return (
        <SafeAreaView style={styles.container}>
            <MainProductHeader />
            {activeTab ? <CategoriesSection /> : <BrandSection />}
        </SafeAreaView>
    )
}

export default MainProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
})
