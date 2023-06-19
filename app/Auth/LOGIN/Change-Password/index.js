//
import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/core'
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import changePasswordImage from '../../../../../assets/images/AUTH-IMAGES/changePassword.png';
import { SubHeader, CustomInput, Devider, CustomButton } from '../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
//
const ChangePasswordScreen = () => {
    const { navigate } = useNavigation()
    const [error, setError] = useState(false)
    // Formik and yup validation data
    const loginInfo = { password: '', confirmPassword: '' }
    // on submit method
    const changePassword = (values) => {
        const { password, confirmPassword } = values;
        if (password != confirmPassword)
            setError('Please Confirm Your Password ')
        else {
            setError(false)
            // Updata The Password
        }
    }
    // Refrences
    const feildTwo = useRef();
    // jsx
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Change Password" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={styles.scrollCon}>
                    <Devider />
                    <View style={{ width: '80%', height: 200, marginLeft: '10%' }}>
                        <Image
                            source={changePasswordImage}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                    <Devider />
                    <View style={styles.formCon}>
                        <Text style={styles.title}>
                            change Password
                        </Text>
                        <Formik
                            initialValues={loginInfo}
                            onSubmit={changePassword}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={{ paddingBottom: '10%' }}>
                                        <CustomInput
                                            name='password'
                                            label='New Password'
                                            reference={feildTwo}
                                            value={values.password}
                                            showEyeIcon={true}
                                            secureTextEntry={true}
                                            returnKeyType="done"
                                            placeholder="Enter Your Password"
                                            onChangeText={handleChange}
                                        />
                                        <CustomInput
                                            name='confirmPassword'
                                            label='Confirm Password'
                                            reference={feildTwo}
                                            value={values.confirmPassword}
                                            showEyeIcon={true}
                                            secureTextEntry={true}
                                            returnKeyType="done"
                                            placeholder="Confirm Your Password"
                                            onChangeText={handleChange}
                                        />
                                        {
                                            error &&
                                            <View style={[styles.errorCon]}>
                                                <Text style={[styles.errorsTxt]}>{error}</Text>
                                            </View>
                                        }
                                        <Devider />
                                        {/* Controls */}
                                        <CustomButton title="Save" clickHandler={handleSubmit} />
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

export default ChangePasswordScreen;

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
        letterSpacing: 1,
        textTransform: "uppercase"
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

