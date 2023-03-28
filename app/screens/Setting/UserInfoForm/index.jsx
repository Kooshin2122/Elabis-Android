//
import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { CustomInput, Devider, SubHeader } from '../../../components';
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const formDataVerificationSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    phoneNumber: yup.string().required("required").min(8),
    country: yup.string().required("required"),
    city: yup.string().required("required"),
    village: yup.string().required("required"),
})

const UserInfoForm = () => {
    const formData = { fullName: '', phoneNumber: '', email: '', country: '', city: '', village: '', addressDiscription: '' }
    const { navigate } = useNavigation()
    // main function
    const onSaveData = (values) => {
        console.log('Values-------------->', values);
        navigate('EditProfile')
    }
    return (
        <SafeAreaView style={styles.container} >
            <SubHeader title="Form" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={styles.scrollCon}>
                    <Devider />
                    <Devider />
                    <Formik
                        initialValues={formData}
                        validationSchema={formDataVerificationSchema}
                        onSubmit={onSaveData}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formContainer}>
                                    <CustomInput
                                        name='fullName'
                                        label='Full Name'
                                        value={values.fullName}
                                        placeholder="Enter Your Full Name"
                                        onChangeText={handleChange}
                                        required={errors.fullName ? ` (${errors.fullName})` : '*'}
                                    />
                                    <CustomInput
                                        name='phoneNumber'
                                        label='Phone Number'
                                        value={values.phoneNumber}
                                        placeholder="252 XX X XX XX XX"
                                        onChangeText={handleChange}
                                        keyboardType="numeric"
                                        required={errors.phoneNumber ? ` (required 7 digits)` : '*'}
                                    />
                                    <CustomInput
                                        name='email'
                                        label='Email (optional)'
                                        required=''
                                        value={values.email}
                                        placeholder="Enter Your Email"
                                        onChangeText={handleChange}
                                    />
                                    <CustomInput
                                        name='country'
                                        label='Country'
                                        value={values.country}
                                        placeholder="Somalia"
                                        onChangeText={handleChange}
                                        required={errors.country ? ` (${errors.country})` : '*'}
                                    />
                                    <CustomInput
                                        name='city'
                                        label='City'
                                        value={values.city}
                                        placeholder="enter the city"
                                        onChangeText={handleChange}
                                        required={errors.city ? ` (${errors.city})` : '*'}
                                    />
                                    <CustomInput
                                        name='village'
                                        label='Village'
                                        value={values.village}
                                        placeholder="enter your village"
                                        onChangeText={handleChange}
                                        required={errors.village ? ` (${errors.village})` : '*'}
                                    />
                                    <CustomInput
                                        name='addressDiscription'
                                        label='Address Discription (optional)'
                                        required=''
                                        value={values.addressDiscription}
                                        placeholder="Enter Your address discription"
                                        onChangeText={handleChange}
                                    />
                                    <Devider />
                                    <Pressable onPress={handleSubmit} style={styles.nextBtnCon}>
                                        <Text style={styles.nextBtnTxt}>
                                            Save
                                </Text>
                                    </Pressable>
                                </View>
                            )
                        }}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default UserInfoForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    formContainer: {
        paddingHorizontal: '2%',
        paddingBottom: '10%'
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
    },
    nextBtnCon: {
        borderRadius: 40,
        paddingVertical: '3%',
        backgroundColor: COLORS.primary_color
    },
    nextBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})
