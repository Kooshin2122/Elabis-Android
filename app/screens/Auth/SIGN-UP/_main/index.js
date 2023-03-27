//
import React, { useRef } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/core'
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import signUpImage from '../../../../../assets/images/AUTH-IMAGES/sign-up.png';
import { SubHeader, CustomInput, Devider, CustomButton } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const SignUpScreen = () => {
    const { navigate } = useNavigation()
    // Formik and yup validation data
    const signUpInfo = { fullName: '', phoneNumber: '', password: '' }
    const signUpVerificationSchema = yup.object().shape({
        fullName: yup.string().required("Full-Name is required").min(3),
        phoneNumber: yup.string().required("Phone Number is required").min(7),
        password: yup.string().required("Password is required").min(3),
    })
    // on submit method
    const onSignUp = (values) => {
        // console.log('---------- Sign-Up', values);
        navigate('SignUpStack', {
            screen: "OTP",
            params: {
                userInfo: {
                    fullName: values.fullName,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                }
            }
        })
    }
    // 
    const feildTwo = useRef()
    const feildThree = useRef()
    // jsx
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Sign-up" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={styles.scrollCon}>
                    <View style={{ width: '100%', height: 200, borderWidth: 0.5, borderColor: COLORS.primary_color }}>
                        <Image
                            source={signUpImage}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.formCon}>
                        <Text style={styles.title}>
                            SIGN-UP
                        </Text>
                        <Formik
                            initialValues={signUpInfo}
                            validationSchema={signUpVerificationSchema}
                            onSubmit={onSignUp}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={{ paddingBottom: '10%' }}>
                                        <CustomInput
                                            name='fullName'
                                            label='Full Name'
                                            value={values.fullName}
                                            placeholder="Enter Your Full Name"
                                            onChangeText={handleChange}
                                            onSubmitEditing={() => feildTwo.current.focus()}
                                        />
                                        <CustomInput
                                            name='phoneNumber'
                                            label='Phone Number'
                                            value={values.phoneNumber}
                                            reference={feildTwo}
                                            placeholder="252 XX X XX XX XX"
                                            onChangeText={handleChange}
                                            onSubmitEditing={() => feildThree.current.focus()}
                                        />
                                        <CustomInput
                                            name='password'
                                            label='Password'
                                            reference={feildThree}
                                            value={values.password}
                                            showEyeIcon={true}
                                            secureTextEntry={true}
                                            returnKeyType="done"
                                            placeholder="Enter Your Password"
                                            onChangeText={handleChange}
                                        />
                                        {
                                            (errors.phoneNumber || errors.password) &&
                                            <View style={[styles.errorCon]}>
                                                <Text style={[styles.errorsTxt, { display: errors.fullName ? 'flex' : 'none' }]}>{errors.fullName}</Text>
                                                <Text style={[styles.errorsTxt, { display: errors.phoneNumber ? 'flex' : 'none' }]}>{errors.phoneNumber}</Text>
                                                <Text style={[styles.errorsTxt, { display: errors.password ? 'flex' : 'none' }]}>{errors.password}</Text>
                                            </View>
                                        }
                                        <Devider />
                                        {/* Controls */}
                                        <CustomButton title="NEXT" clickHandler={handleSubmit} />
                                        <Devider />
                                        <Pressable onPress={() => navigate('LoginStack')} style={{ marginBottom: '5%' }}>
                                            <Text style={styles.forgotPasswordText}>
                                                all ready have an account
                                            </Text>
                                        </Pressable>
                                        {/* <CustomButton style={styles.signUpBtn} title="ALL READY HAVE AN ACCOUNT" textColor={COLORS.primary_color} clickHandler={() => navigate('LoginStack')} /> */}
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

export default SignUpScreen;

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
        paddingVertical: LAY_OUT.padding,
        paddingHorizontal: '4%'
        // backgroundColor: 'blue',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 1
    },
    forgotPasswordText: {
        fontSize: 17,
        textAlign: 'center',
        // textDecorationLine: 1,
        letterSpacing: 1,
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


