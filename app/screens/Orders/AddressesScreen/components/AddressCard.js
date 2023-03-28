//
import React, { useMemo, useState } from 'react';
import { Devider } from '../../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LAY_OUT, COLORS } from '../../../../Theme/GLOBAL_STYLES';

const AddressCard = ({ id, fullName, phoneNumber, email, country, city, village, addressDescription }) => {
    const [selectedAddress, setSelectedAddress] = useState()
    const onSelectAddress = () => {
        setSelectedAddress(id)
    }
    const isActive = useMemo(() => {
        return selectedAddress == id
    }, [selectedAddress])

    return (
        <View style={styles.addressContainer}>
            <View style={LAY_OUT.flex_row} >
                <Pressable onPress={onSelectAddress}>
                    <RadioButton isActive={isActive} />
                </Pressable>
                <Text style={styles.addressTitle}>
                    Default Address
                </Text>
                <Pressable>
                    <AntDesign name="delete" size={23} color="red" />
                </Pressable>
            </View>
            <Devider />
            {/* personal info */}
            <View>
                <Text style={styles.title}>
                    Personal Information
                </Text>
                <Text style={styles.description}>
                    Name : {fullName},
                    Phone-Number: {phoneNumber},
                    Email: {email}
                </Text>
            </View>
            <Devider />
            {/* Address Info */}
            <View>
                <Text style={styles.title}>
                    Address Information
                </Text>
                <Text style={styles.description}>
                    Country : {country},
                    City: {city},
                    Village: {village} {addressDescription}
                </Text>
            </View>
        </View>
    )
}

export default AddressCard;

const RadioButton = ({ isActive }) => {
    return (
        <View style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 40, borderColor: COLORS.primary_color, justifyContent: 'center', alignItems: 'center' }}>
            {
                isActive &&
                <View style={{ width: 18, height: 18, borderRadius: 40, backgroundColor: COLORS.primary_color }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '5%',
        borderColor: COLORS.gray_color
    },
    addressTitle: {
        fontSize: 15,
        fontWeight: '300',
        textTransform: 'uppercase'
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
})
