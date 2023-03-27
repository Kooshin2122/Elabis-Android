//
import React, { useEffect, useState } from 'react';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { SubHeader, Devider } from '../../../components';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TabBox } from './components';
import { useNavigation } from '@react-navigation/core';

const FilteringScreen = () => {
    const { getParent } = useNavigation();
    const [selectTab, setSelectTab] = useState('Category')
    useEffect(() => {
        getParent().setOptions({ tabBarStyle: { display: 'none' } })
        return () => {
            getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 70 : 90,
                }
            })
        }
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Filter" />
            {/* Custome Top Tabs */}
            {/* <View style={styles.tabsContainer}>
                <TabBox name="Category" selectTab={selectTab} changeSelectTab={setSelectTab} />
                <TabBox name="Brands" selectTab={selectTab} changeSelectTab={setSelectTab} />
                <TabBox name="Models" selectTab={selectTab} changeSelectTab={setSelectTab} />
                <TabBox name="Years" selectTab={selectTab} changeSelectTab={setSelectTab} />
            </View> */}
            {/* Selected Itemes Container */}
            <View style={styles.selectedItemsCon}>
                <Text>
                    Selected Item
                </Text>
            </View>
            {/* Main Container */}
            <View style={styles.MainContainer}>
                {/* Side Bar Section */}
                <View style={styles.SideBarContainer}>
                    <TabBox name="Category" selectTab={selectTab} changeSelectTab={setSelectTab} />
                    <TabBox name="Brands" selectTab={selectTab} changeSelectTab={setSelectTab} />
                    <TabBox name="Models" selectTab={selectTab} changeSelectTab={setSelectTab} />
                    <TabBox name="Years" selectTab={selectTab} changeSelectTab={setSelectTab} />
                </View>
                {/* Main View Section */}
                <View style={styles.MainViewContainer}>

                </View>
            </View>
            {/* Control Section */}
            <View style={styles.controlsContainer}>

            </View>


        </SafeAreaView>
    )
}

export default FilteringScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    selectedItemsCon: {
        flex: 0.1,
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    SideBarContainer: {
        flex: 0.4,
        borderRightWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    MainViewContainer: {
        flex: 1
    },
    controlsContainer: {
        flex: 0.1,
        borderTopWidth: 0.6,
        borderColor: COLORS.gray_color
    }
})
