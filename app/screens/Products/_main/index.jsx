import React, { useCallback, useEffect } from 'react'
import { fetchGetData } from '../../../API';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { useFocusEffect } from '@react-navigation/core';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandSection, CategoriesSection, MainProductHeader } from './components';
import { changeSelectBrand, changeSelectSubCategory } from '../../../ReduxStore/ProductScreenSlice';
//
const MainProductsScreen = () => {
    const dispatch = useDispatch();
    const { activeTab } = useSelector((state) => state.productsSlice);
    // // dispach all filters to initial values
    // useFocusEffect(useCallback(() => {
    //     dispatch(changeSelectSubCategory("All"));
    //     dispatch(changeSelectBrand({
    //         name: "All", Modal: "All", year: "All"
    //     }));
    // }, []));
    //
    return (
        <SafeAreaView style={styles.container}>
            <MainProductHeader />
            {activeTab ? <CategoriesSection /> : <BrandSection />}
        </SafeAreaView>
    )
}
//
export default MainProductsScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
})
