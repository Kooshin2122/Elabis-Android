//
import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/core'
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import signUpImage from '../../../../../assets/images/AUTH-IMAGES/sign-up.png';
import { SubHeader, CustomInput, Devider, CustomButton } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formDataGenerator } from '../../../../utils';
// import { https } from '../../../../API';

const SignUpScreen = () => {
    const { navigate } = useNavigation()
    // Formik and yup validation data
    const signUpInfo = { name: '', email: '', phone_number: '', password: '' }
    const signUpVerificationSchema = yup.object().shape({
        name: yup.string().required("Full-Name is required").min(3),
        phone_number: yup.string().required("Phone Number is required").min(10),
        password: yup.string().required("Password is required").min(3),
    })
    // on submit method
    const onSignUp = async (values) => {
        const formData = await formDataGenerator(values)
        // const res = await https.post("buyer/user/signup", formData)
        console.log("Response", res);
        // navigate('SignUpStack', {j
        //     screen: "OTP",
        //     params: {
        //         userInfo: {
        //             name: values.name,
        //             email: values.email,
        //             phone_number: values.phone_number,
        //             password: values.password,
        //         }
        //     }
        // })
    }
    // 
    const feildTwo = useRef()
    const feildThree = useRef()
    const feildFour = useRef()
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
                    <Text style={styles.title}>
                        Create Account
                    </Text>
                    <Devider height={25} />
                    <View style={styles.formCon}>
                        <Text style={styles.title}>
                            SIGN-UP
                        </Text>
                        <Devider height={25} />
                        <Formik
                            initialValues={signUpInfo}
                            validationSchema={signUpVerificationSchema}
                            onSubmit={onSignUp}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={{ paddingBottom: '3%' }}>
                                        <CustomInput
                                            name='name'
                                            label='Full Name'
                                            value={values.name}
                                            placeholder="Enter Your Full Name"
                                            onChangeText={handleChange}
                                            onSubmitEditing={() => feildTwo.current.focus()}
                                        />
                                        <CustomInput
                                            name='email'
                                            label='Email'
                                            value={values.email}
                                            reference={feildTwo}
                                            required=" (optional)"
                                            placeholder="Example@gmail.com"
                                            onChangeText={handleChange}
                                            onSubmitEditing={() => feildThree.current.focus()}
                                        />
                                        <CustomInput
                                            name='phone_number'
                                            label='Phone Number'
                                            value={values.phone_number}
                                            reference={feildThree}
                                            placeholder="252 XX X XX XX XX"
                                            onChangeText={handleChange}
                                            onSubmitEditing={() => feildFour.current.focus()}
                                        />
                                        <CustomInput
                                            name='password'
                                            label='Password'
                                            reference={feildFour}
                                            value={values.password}
                                            showEyeIcon={true}
                                            secureTextEntry={true}
                                            returnKeyType="done"
                                            placeholder="Enter Your Password"
                                            onChangeText={handleChange}
                                        />
                                        {
                                            (errors.phone_number || errors.password) &&
                                            <View style={[styles.errorCon]}>
                                                <Text style={[styles.errorsTxt, { display: errors.name ? 'flex' : 'none' }]}>{errors.name}</Text>
                                                <Text style={[styles.errorsTxt, { display: errors.phone_number ? 'flex' : 'none' }]}>{errors.phone_number}</Text>
                                                <Text style={[styles.errorsTxt, { display: errors.password ? 'flex' : 'none' }]}>{errors.password}</Text>
                                            </View>
                                        }
                                        <Devider />
                                        {/* Controls */}
                                        <CustomButton title="NEXT" clickHandler={handleSubmit} />
                                        {/* <CustomButton style={styles.signUpBtn} title="ALL READY HAVE AN ACCOUNT" textColor={COLORS.primary_color} clickHandler={() => navigate('LoginStack')} /> */}
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                    <Devider />
                    <View style={{ flexDirection: 'row', columnGap: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.forgotPasswordText}>
                            allready have an account
                        </Text>
                        <Pressable onPress={() => navigate('LoginStack')}>
                            <Text style={styles.btnText}>
                                Login Now
                            </Text>
                        </Pressable>
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
        padding: '3%',
        paddingVertical: LAY_OUT.paddingY,
    },
    formCon: {
        padding: '5%',
        minHeight: 180,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        letterSpacing: 0.5
    },
    forgotPasswordText: {
        fontSize: 17,
        textAlign: 'center',
        letterSpacing: 1,
        color: COLORS.black_color,
    },
    btnText: {
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.5,
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


