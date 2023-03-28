import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Devider, SubHeader } from '../../../components';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import AddressCard from './components/AddressCard';
import { allAddressesAPIendPoint } from './services';

const AddressesScreen = () => {
    return (
        <SafeAreaView style={styles.container} >
            <SubHeader title="Addresses" />
            <ScrollView style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <Devider />
                {
                    allAddressesAPIendPoint.map((item) => <AddressCard key={item.id} {...item} />)
                }
                <Devider />
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddressesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    }

})
