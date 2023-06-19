//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { Devider, ModalContainer } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { showPaymentLoadingModal } from '../../../../ReduxStore/OrdersSlice';
//
const StepFour = ({ changeCurrentPosition }) => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { personalInfo, deliveryAddress, paymentInfo } = useSelector((state) => state.ordersSlice);
    // On Pay Money 
    const paymentMethod = () => {
        // payment Number
        dispatch(showPaymentLoadingModal());
        console.log('personalInfo ------------>', personalInfo);
        console.log('deliveryAddress ------------>', deliveryAddress);
        console.log('paymentInfo ------------>', paymentInfo);
    }
    //
    return (
        <View style={styles.container}>
            <Devider />
            {/* Adress Container */}
            <View style={styles.addressContainer}>
                <Text style={styles.checkAddress}>
                    Check Your Address
                </Text>
                <Devider />
                {/* personal info */}
                <View>
                    <View style={LAY_OUT.flex_row} >
                        <Text style={styles.title}>
                            Personal Information
                        </Text>
                        <Pressable onPress={() => changeCurrentPosition(0)} >
                            <Text style={styles.title}>
                                Edit
                            </Text>
                        </Pressable>
                    </View>
                    <Text style={styles.description}>
                        Name : {personalInfo.fullName},
                        Phone-Number: {personalInfo.phoneNumber},
                        Email: {personalInfo.email}
                    </Text>
                </View>
                <Devider />
                {/* Address Info */}
                <View>
                    <View style={LAY_OUT.flex_row} >
                        <Text style={styles.title}>
                            {deliveryAddress.title} Address Information
                        </Text>
                        <Pressable onPress={() => changeCurrentPosition(1)} >
                            <Text style={styles.title}>
                                Edit
                            </Text>
                        </Pressable>
                    </View>
                    <Text style={styles.description}>
                        Country : Somalia,
                        State:{deliveryAddress.state?.name},
                        Region:{deliveryAddress.region?.name},
                        Near By:{deliveryAddress.landmark},
                        Description:{deliveryAddress.additional_information}
                    </Text>
                </View>
                <Devider />
                {/* payment Info */}
                <View>
                    <View style={LAY_OUT.flex_row} >
                        <Text style={styles.title}>
                            Payment Method
                        </Text>
                        <Pressable onPress={() => changeCurrentPosition(2)} >
                            <Text style={styles.title}>
                                Edit
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[LAY_OUT.flex_row, { marginTop: '2%', alignItems: 'flex-start' }]}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={paymentInfo.imageUrl}
                                resizeMode='cover'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <View>
                            <Text style={[styles.description, { alignSelf: 'flex-end' }]}>
                                {paymentInfo.serviceName}
                            </Text>
                            <Text style={styles.description}>
                                Payment Number : {paymentInfo.phoneNumber}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Devider />
            {/* Address Buttons */}
            <View style={LAY_OUT.flex_row}>
                <Pressable style={styles.addressBtn} onPress={() => navigate('AddressesScreen')} >
                    <Text>Select An Other Address</Text>
                </Pressable>
                <Pressable style={styles.addressBtn} onPress={() => navigate("AddressFormScreen")}>
                    <Text>Add New Address</Text>
                </Pressable>
            </View>
            <Devider />
            {/* Payment Buttons */}
            <View style={styles.paymentContainer}>
                <Text style={styles.checkAddress}>
                    Payment Process
                </Text>
                <Devider />
                <View style={LAY_OUT.flex_row} >
                    <Text style={styles.paymentTitle}>
                        Basket Total
                    </Text>
                    <Text style={styles.paymentTitle}>
                        $10
                    </Text>
                </View>
                <View style={LAY_OUT.flex_row}>
                    <Text style={styles.description}>
                        Quantity: 5
                    </Text>
                    <Text style={styles.description}>
                        Payment Number : {paymentInfo.phoneNumber}
                    </Text>
                </View>
                <Devider />
                {/* Payment Button */}
                <Pressable onPress={paymentMethod} style={styles.paymentButton} >
                    <Text style={styles.paymentButtonTxt} >
                        Pay $10
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default StepFour;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
    },
    addressContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray_color
    },
    checkAddress: {
        fontSize: 14,
        fontWeight: '300',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    description: {
        fontSize: 13,
        marginTop: '2%',
        fontWeight: '300',
    },
    imageContainer: {
        width: 120,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.primary_color,
    },
    addressBtn: {
        width: '48%',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: '3%',
        paddingHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    paymentContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray_color
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    paymentButton: {
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: '3%',
        backgroundColor: COLORS.primary_color
    },
    paymentButtonTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'uppercase'
    }
})
