//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import StepIndicator from 'react-native-step-indicator';
import { Devider, SubHeader } from '../../../components';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
// Steps --------------------------->
import { StepOne, StepTwo, StepThree, StepFour } from './Steps';
// ---------------------------------->
const labels = ["Personal Information", "Delivery Address", "Payment Method", "Order Confirmation"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: COLORS.primary_color,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: COLORS.primary_color,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: COLORS.primary_color,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: COLORS.primary_color,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.primary_color,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelSize: 13,
    labelColor: '#999999',
    currentStepLabelColor: COLORS.primary_color
}
// ------------------------------------>
const CheckOutScreen = () => {
    const { getParent } = useNavigation()
    const [currentPosition, setCurrentPosition] = useState(0);
    // Hide Bottom Tabs when you are in sub screen
    // useEffect(() => {
    //     getParent().setOptions({ tabBarStyle: { display: 'none', } })
    //     return () => {
    //         getParent().setOptions({
    //             tabBarStyle: {
    //                 display: 'flex',
    //                 borderTopColor: 'rgba(0, 0, 0, .2)',
    //                 paddingTop: Platform.OS === 'android' ? 15 : 10,
    //                 paddingBottom: Platform.OS === 'android' ? 15 : 30,
    //                 height: Platform.OS === 'android' ? 70 : 90,
    //             }
    //         })
    //     }
    // }, [])
    //
    const onPageChange = (position) => {
        if (position > currentPosition)
            alert('Please Fill The Form then click next button')
        else
            setCurrentPosition(position)
    }
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Check-out" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Devider />
                    <StepIndicator
                        stepCount={4}
                        labels={labels}
                        onPress={onPageChange}
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                    />
                    {/* Steps Container */}
                    {currentPosition == 0 && <StepOne changeCurrentPosition={setCurrentPosition} />}
                    {currentPosition == 1 && <StepTwo changeCurrentPosition={setCurrentPosition} />}
                    {currentPosition == 2 && <StepThree changeCurrentPosition={setCurrentPosition} />}
                    {currentPosition == 3 && <StepFour changeCurrentPosition={setCurrentPosition} />}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default CheckOutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    }
})
