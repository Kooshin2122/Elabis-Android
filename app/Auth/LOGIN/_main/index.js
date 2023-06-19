import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/core'
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import loginImage from '../../../../../assets/images/AUTH-IMAGES/login.png';
import { SubHeader, CustomInput, Devider, CustomButton } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
    const { navigate } = useNavigation()
    // Formik and yup validation data
    const loginInfo = { phoneNumber: '', password: '' }
    const loginVerificationSchema = yup.object().shape({
        phoneNumber: yup.string().required("Please Enter Your Phone Number").min(7),
        password: yup.string().required("Please Enter Your Password").min(3),
    });
    // on submit method
    const onLogin = (values) => {
        console.log('----------', values);
    }
    // 
    const feildTwo = useRef()
    // jsx
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Login" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={styles.scrollCon}>
                    <View style={{ width: '80%', height: 200, marginLeft: '10%' }}>
                        <Image
                            source={loginImage}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                    <Devider />
                    <View style={styles.formCon}>
                        <Text style={styles.title}>
                            LOG-IN
                        </Text>
                        <Formik
                            initialValues={loginInfo}
                            validationSchema={loginVerificationSchema}
                            onSubmit={onLogin}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={{ paddingBottom: '10%' }}>
                                        <CustomInput
                                            name='phoneNumber'
                                            label='Phone Number'
                                            value={values.phoneNumber}
                                            keyboardType="numeric"
                                            placeholder="252 XX X XX XX XX"
                                            onChangeText={handleChange}
                                            onSubmitEditing={() => feildTwo.current.focus()}
                                        />
                                        <CustomInput
                                            name='password'
                                            label='Password'
                                            reference={feildTwo}
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
                                                <Text style={[styles.errorsTxt, { display: errors.phoneNumber ? 'flex' : 'none' }]}>{errors.phoneNumber}</Text>
                                                <Text style={[styles.errorsTxt, { display: errors.password ? 'flex' : 'none' }]}>{errors.password}</Text>
                                            </View>
                                        }
                                        <Devider />
                                        {/* Controls */}
                                        <Pressable onPress={() => navigate('ForgotPassword')}>
                                            <Text style={styles.forgotPasswordText}>
                                                Forgot Password
                                            </Text>
                                        </Pressable>
                                        <Devider />
                                        <CustomButton title="LOGIN" clickHandler={handleSubmit} />
                                        <Devider />
                                        <Pressable onPress={() => navigate('SignUpStack')} style={{ marginBottom: '5%' }}>
                                            <Text style={styles.signUpBtnTxt}>
                                                Create New Account
                                            </Text>
                                        </Pressable>
                                        {/* <CustomButton style={styles.signUpBtn} title="CREATE NEW ACCOUNT" textColor={COLORS.primary_color} clickHandler={() => navigate('SignUpStack')} /> */}
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

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
        textAlign: 'right',
        // textDecorationLine: 1,
        letterSpacing: 2,
        color: COLORS.primary_color,
    },
    signUpBtnTxt: {
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
