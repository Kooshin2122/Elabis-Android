import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Devider, SubHeader } from '../../../components';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { DefaultAddressCard, ImagePicker, InfoCard } from './components';

const EditProfile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="profile" />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                <ImagePicker />
                <Text style={styles.title}>
                    Basic Information
                </Text>
                {/* Basic Info Container */}
                <View style={styles.basicInfoCon}>
                    <InfoCard label="Name" value="Abdirahman Abdirashid" />
                    <InfoCard label="Phone" value="252 615 094 596" />
                    <InfoCard label="Email" value="Abdirahman@gmail.com" />
                </View>
                <Text style={styles.title}>
                    Default Address
                </Text>
                <View style={styles.defaultAddressCon}>
                    <InfoCard label="Country" value="Somalia" />
                    <InfoCard label="City" value="Mogadisho" />
                    <InfoCard label="Village" value="Ciise Qodax" />
                    <InfoCard label="Address Discription" value="" />
                </View>
                {/* Scroll padding bottom */}
                <Devider />
                <Devider />
                <Devider />
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_secondary
    },
    title: {
        fontSize: 16,
        padding: '3%',
        letterSpacing: 1,
    },
    basicInfoCon: {
        paddingTop: '4%',
        paddingBottom: '6%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_primary
    },
    defaultAddressCon: {
        paddingTop: '4%',
        paddingBottom: '6%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_primary
    }
})
