//
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import AddressCard from './components/AddressCard';
import { allAddressesAPIendPoint } from './services';
import { Devider, SubHeader } from '../../../components';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { changePersonalInfo, changeDeliveryAddress } from '../../../ReduxStore/OrdersSlice';
//
const AddressesScreen = () => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState({ id: null });
    //
    const changeDefaultAddress = () => {
        navigate('CheckOut')
        if (selectedAddress.id) {
            dispatch(changePersonalInfo({ fullName: selectedAddress.fullName, phoneNumber: selectedAddress.phoneNumber, email: selectedAddress.email }))
            dispatch(changeDeliveryAddress({ country: selectedAddress.country, city: selectedAddress.city, village: selectedAddress.village, addressDescription: selectedAddress.addressDescription, }))
        }
    }
    //
    return (
        <SafeAreaView style={styles.container} >
            <SubHeader title="Addresses" />
            <ScrollView style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <Devider />
                <View style={styles.titileContainer}>
                    <Text style={styles.title}>
                        please select your default shipping address
                    </Text>
                </View>
                <Devider />
                {
                    allAddressesAPIendPoint.map((item) => <AddressCard key={item.id} {...item} selectAddress={selectedAddress} changeSelectAddress={setSelectedAddress} />)
                }
                <Devider />
            </ScrollView>
            <View style={styles.controlsCon}>
                <Pressable onPress={changeDefaultAddress} disabled={false}>
                    <Text style={{ color: '#f43f5f' }}>
                        APPLY CHANGES
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
//
export default AddressesScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    titileContainer: {
        padding: '3%',
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 0.8,
    },
    controlsCon: {
        padding: '4%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.bg_tertiary
    }

})
