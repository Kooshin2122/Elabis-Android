//
import React, { useRef } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/core'
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import messageImage from '../../../../../assets/images/AUTH-IMAGES/OTP.png';
import { SubHeader, CustomInput, Devider, CustomButton } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const Login_OTP_Screen = ({ route }) => {
    const { navigate, } = useNavigation()
    const { otherParam } = route?.params ?? { otherParam: null };
    console.log('formLoginOTP----------', otherParam);
    // Formik and yup validation data;
    const OTP_Values = { box1: '', box2: '', box3: '', box4: '' }
    const OTP_VerificationSchema = yup.object().shape({
        box1: yup.string().required("Please Fill All Boxies").max(1),
        box2: yup.string().required("Please Fill All Boxies").max(1),
        box3: yup.string().required("Please Fill All Boxies").max(1),
        box4: yup.string().required("Please Fill All Boxies").max(1),
    })
    // Main Function
    const onNext = (values) => {
        console.log('----------OTP', values);
        // If The phone number ecxist navigate the Change Password Screen;
        navigate('LoginStack', {
            screen: 'ChangePassword'
        })
    }
    //
    const boxTwo = useRef()
    const boxThree = useRef()
    const boxFour = useRef()
    // JSX
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="OTP Verification" />
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
                            source={messageImage}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                    <Devider />
                    <View style={styles.formCon}>
                        <Text style={styles.title}>
                            OTP VERIFICATION
                        </Text>
                        <Devider height={5} />
                        <Text style={styles.description}>
                            We have sent you an OTP code to this phone number ( {otherParam?.phoneNumber ?? null} ). Please fill  the boxes correctly
                        </Text>
                        <Devider />
                        <Formik
                            initialValues={OTP_Values}
                            validationSchema={OTP_VerificationSchema}
                            onSubmit={onNext}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View>
                                        <View style={LAY_OUT.flex_row}>
                                            <OTP_FEILD
                                                name="box1"
                                                value={values.box1}
                                                onChangeText={handleChange}
                                                onSubmitEditing={() => boxTwo.current.focus()}
                                            />
                                            <OTP_FEILD
                                                name="box2"
                                                value={values.box2}
                                                reference={boxTwo}
                                                onChangeText={handleChange}
                                                onSubmitEditing={() => boxThree.current.focus()}
                                            />
                                            <OTP_FEILD
                                                name="box3"
                                                value={values.box3}
                                                reference={boxThree}
                                                onChangeText={handleChange}
                                                onSubmitEditing={() => boxFour.current.focus()}
                                            />
                                            <OTP_FEILD
                                                name="box4"
                                                value={values.box4}
                                                reference={boxFour}
                                                returnKeyType="done"
                                                onChangeText={handleChange}
                                            />
                                        </View>
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

export default Login_OTP_Screen;

const OTP_FEILD = ({ value, name, reference, returnKeyType = "next", onChangeText = () => { }, onSubmitEditing = () => { } }) => {
    return (
        <View style={styles.OTP_CON}>
            <TextInput
                value={value}
                keyboardType="numeric"
                returnKeyType={returnKeyType}
                ref={reference}
                onChangeText={onChangeText(name)}
                onSubmitEditing={onSubmitEditing}
                style={styles.inputCon}
                maxLength={1}
            // cursorColor={COLORS.bg_primary}
            />
        </View>
    )
}

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
    OTP_CON: {
        width: '23%',
        height: 70,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary_color,
    },
    inputCon: {
        width: '100%',
        height: "100%",
        fontSize: 28,
        textAlign: 'center'
    }
})

