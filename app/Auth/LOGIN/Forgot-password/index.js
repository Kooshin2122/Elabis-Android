//
import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/core'
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import forgotImage from '../../../../../assets/images/AUTH-IMAGES/forgot.png';
import { SubHeader, CustomInput, Devider, CustomButton } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const ForgotPasswordScreen = () => {
    const { navigate } = useNavigation()
    const numberVerification = { phoneNumber: '' }
    const numberVerificationSchema = yup.object().shape({
        phoneNumber: yup.string().required("Please Enter Your Phone Number").min(7),
    })
    // Main Function
    const onNext = (values) => {
        // If The phone number ecxist navigate the OTP screen
        navigate('LoginStack', {
            screen: "LoginOTP",
            params: {
                otherParam: {
                    phoneNumber: values?.phoneNumber ?? null
                }
            }
        })
    }
    // JSX
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Mobile Verification" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={styles.scrollCon}>
                    <View style={{ width: '80%', height: 200, marginLeft: '10%' }}>
                        <Image
                            source={forgotImage}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                    <Devider />
                    <View style={styles.formCon}>
                        <Text style={styles.title}>
                            MOBILE VERIFICATION
                        </Text>
                        <Devider height={5} />
                        <Text style={styles.description}>
                            Please enter you registration phone number and we will send you an OTP then you can change your password
                        </Text>
                        <Devider height={10} />
                        <Formik
                            initialValues={numberVerification}
                            validationSchema={numberVerificationSchema}
                            onSubmit={onNext}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={{ paddingBottom: '10%' }}>
                                        <CustomInput
                                            name='phoneNumber'
                                            label='Phone Number'
                                            value={values.phoneNumber}
                                            returnKeyType="done"
                                            placeholder="252 XX X XX XX XX"
                                            onChangeText={handleChange}
                                        />
                                        {
                                            errors.phoneNumber &&
                                            <View style={[styles.errorCon]}>
                                                <Text style={[styles.errorsTxt, { display: errors.phoneNumber ? 'flex' : 'none' }]}>{errors.phoneNumber}</Text>
                                            </View>
                                        }
                                        {/* Controls */}
                                        <Devider />
                                        <CustomButton title="NEXT" clickHandler={handleSubmit} />
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingVertical: LAY_OUT.paddingY,
        // backgroundColor: COLORS.bg_secondary
    },
    formCon: {
        minHeight: 200,
        padding: LAY_OUT.padding,
        // backgroundColor: 'blue',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 1
    },
    description: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: 17,
        letterSpacing: 1
    },
    forgotPasswordText: {
        fontSize: 17,
        textAlign: 'right',
        // textDecorationLine: 1,
        letterSpacing: 2,
        color: COLORS.primary_color,
    },
    signUpBtn: {
        marginTop: '5%',
        backgroundColor: COLORS.bg_primary
    },
    errorCon: {
        paddingHorizontal: '2%',
        paddingVertical: '3%',
        backgroundColor: '#fbd5d5',
        borderRadius: 3
    },
    errorsTxt: {
        fontSize: 14,
        color: 'red'
    },
})
