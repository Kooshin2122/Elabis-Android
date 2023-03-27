//
import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import image from '../../../../../assets/images/step2.png';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomInput, Devider } from '../../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { changeDeliveryAddress } from '../../../../ReduxStore/OrdersSlice';

const formVerificationSchema = yup.object().shape({
    country: yup.string().required("required"),
    city: yup.string().required("required"),
    village: yup.string().required("required"),
})

const StepTwo = ({ changeCurrentPosition = () => { } }) => {
    const feildTwo = useRef()
    const feildThree = useRef()
    const feildFour = useRef()
    const dispatch = useDispatch()
    const { deliveryAddress } = useSelector((state) => state.ordersSlice)
    const personalInfo = { country: deliveryAddress.country, city: deliveryAddress.city, village: deliveryAddress.village, addressDescription: deliveryAddress.addressDescription }
    // 
    const onNext = (values) => {
        changeCurrentPosition(2)
        dispatch(changeDeliveryAddress(values))
    }
    // ---------------------------------------->
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
                    Please provide your address delivery guy will pick up you order to your location. keep it correct information.
                </Text>
            </View>
            <Devider />
            {/* Formik Data */}
            <Formik
                initialValues={personalInfo}
                validationSchema={formVerificationSchema}
                onSubmit={onNext}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return (
                        <View style={styles.formContainer}>
                            <CustomInput
                                name='country'
                                label='Country'
                                value={values.country}
                                placeholder="Somalia"
                                onChangeText={handleChange}
                                onSubmitEditing={() => feildTwo.current.focus()}
                                required={errors.country ? ` (${errors.country})` : '*'}
                            />
                            <CustomInput
                                name='city'
                                label='City'
                                value={values.city}
                                reference={feildTwo}
                                placeholder="enter your city"
                                onChangeText={handleChange}
                                onSubmitEditing={() => feildThree.current.focus()}
                                required={errors.city ? ` (${errors.city})` : '*'}
                            />
                            <CustomInput
                                name='village'
                                label='Village'
                                value={values.village}
                                reference={feildThree}
                                placeholder="enter your village"
                                onChangeText={handleChange}
                                onSubmitEditing={() => feildFour.current.focus()}
                                required={errors.village ? ` (${errors.village})` : '*'}
                            />
                            <CustomInput
                                required=''
                                name='addressDescription'
                                label='Address Description (optional)'
                                reference={feildFour}
                                returnKeyType="done"
                                value={values.addressDescription}
                                placeholder="enter your address description"
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

export default StepTwo;

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

