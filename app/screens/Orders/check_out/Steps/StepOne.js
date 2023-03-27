//
import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import image from '../../../../../assets/images/step1.png';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomInput, Devider } from '../../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { changePersonalInfo } from '../../../../ReduxStore/OrdersSlice';

const formVerificationSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    phoneNumber: yup.string().required("required").min(8),
})

// Main Function ------------------------------------------------------------
const StepOne = ({ changeCurrentPosition = () => { } }) => {
    const feildTwo = useRef()
    const feildThree = useRef()
    const dispatch = useDispatch()
    const { personalInfo } = useSelector((state) => state.ordersSlice)
    const personalInformation = { fullName: personalInfo.fullName, phoneNumber: personalInfo.phoneNumber, email: personalInfo.email }
    // OnClick Next
    const onNext = (values) => {
        changeCurrentPosition(1)
        dispatch(changePersonalInfo(values))
    }
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer} >
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <Text style={styles.desc}>
                    Please provide with us personal information just your name and phone number if you have email its good to provide it as well
                </Text>
            </View>
            <Devider />
            {/* Formik Data */}
            <Formik
                initialValues={personalInformation}
                validationSchema={formVerificationSchema}
                onSubmit={onNext}
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
                                onSubmitEditing={() => feildTwo.current.focus()}
                                required={errors.fullName ? ` (${errors.fullName})` : '*'}
                            />
                            <CustomInput
                                name='phoneNumber'
                                label='Phone Number'
                                value={values.phoneNumber}
                                reference={feildTwo}
                                placeholder="252 XX X XX XX XX"
                                onChangeText={handleChange}
                                keyboardType="numeric"
                                onSubmitEditing={() => feildThree.current.focus()}
                                required={errors.phoneNumber ? ` (required 7 digits)` : '*'}
                            />
                            <CustomInput
                                name='email'
                                label='Email (optional)'
                                required=''
                                value={values.email}
                                reference={feildThree}
                                placeholder="Enter Your Email"
                                onChangeText={handleChange}
                            />
                            <Devider />
                            <Pressable onPress={handleSubmit} style={styles.nextBtnCon}>
                                <Text style={styles.nextBtnTxt}>
                                    Next
                                    </Text>
                            </Pressable>
                        </View>
                    )
                }}
            </Formik>
        </View>
    )
}

export default StepOne;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding
    },
    descriptionContainer: {
        paddingBottom: '2%',
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: 150,
    },
    desc: {
        fontSize: 15,
        color: 'gray',
        fontWeight: '300',
        letterSpacing: 0.7,
        textAlign: 'center',
    },
    formContainer: {
        paddingHorizontal: '2%',
        paddingBottom: '10%'
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
