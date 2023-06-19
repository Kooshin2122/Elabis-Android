//
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/core';
import { fetchGetData, fetchPostAuthData } from '../../../API';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { Picker } from 'react-native-ui-lib/src/components/picker';
import { CustomButton, Devider, LoadingIndicator, LoadingModal, PaperTextInput, SubHeader } from '../../../components';
import { FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formDataGenerator } from '../../../utils';
//
const formValidation = Yup.object().shape({
    title: Yup.string().required('Required'),
    landmark: Yup.string().required('Required'),
});
//
const AddressFormScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const [states, setStates] = useState([]);
    const [location, setLocation] = useState();
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const addressInformation = route?.params;
    const { status, UAID, id, title, landmark, state, region, additional_information } = addressInformation?.params?.addressInformation ?? "";
    const [statesPlaceholder, setStatesPlaceholder] = useState(state?.name ?? "Select Your State");
    const [regionsPlaceholder, setRegionsPlaceholder] = useState(region?.name ?? "Select Your Region");
    //
    const [addressInfo, setAddressInfo] = useState({
        title: title, state: state?.id, region: state?.id, landmark: landmark, additional_information: additional_information
    });
    //
    const getStatesAsync = async () => {
        const res = await fetchGetData("global/states/", setLoading);
        setStates(res.data);
    }
    const getRegionsAsync = async () => {
        const res = await fetchGetData("global/regions/");
        setRegions(res.data);
    }
    //
    const getPermisionAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (error) {
            console.log("error happen when getting permision in the expo");
        }
    }
    //
    useEffect(() => {
        getPermisionAsync();
    }, [])
    //
    const saveAddress = async (values) => {
        const address = {
            ...values,
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
        }
        const formData = await formDataGenerator(address);
        const res = await fetchPostAuthData("buyer/address/add", formData, setLoading);
        if (res?.status == "Added Successfully") {
            navigate("AddressesScreen")
            return
        }
    }
    const updateAddress = async (values) => {
        const address = {
            UAID: UAID,
            ...values,
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
        }
        const formData = await formDataGenerator(address);
        const res = await fetchPostAuthData("buyer/address/update", formData, setLoading);
        if (res?.status == "Updated successfully") {
            navigate("AddressesScreen")
            return
        }
    }
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Add New Address" />
            {/* {loading && <LoadingModal />} */}
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1, }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location?.coords.latitude,
                            longitude: location?.coords.longitude,
                        }}
                    />
                    <Formik
                        initialValues={addressInfo}
                        validationSchema={formValidation}
                        onSubmit={UAID ? updateAddress : saveAddress}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                            return (
                                <View style={styles.formContainer}>
                                    <View style={styles.line} />
                                    <Devider />
                                    <Text style={styles.title}>
                                        Add New Address
                                    </Text>
                                    <Devider />
                                    <PaperTextInput
                                        value={values.title}
                                        placeholder="Place Name Ex(Home,Office,Others)"
                                        onChangeText={handleChange("title")}
                                        error={errors.title && touched.title ? true : false}
                                        label={errors.title && touched.title ? "Required" : `Place Name`}
                                    />
                                    <PaperTextInput
                                        placeholder="Near By Ex(Some where)"
                                        value={values.landmark}
                                        onChangeText={handleChange("landmark")}
                                        error={errors.landmark && touched.landmark ? true : false}
                                        label={errors.landmark && touched.landmark ? "Required" : `Near By`}
                                    />
                                    {/* Picker */}
                                    <Picker
                                        useSafeArea
                                        fieldType="form"
                                        onPress={getStatesAsync}
                                        placeholderTextColor="#000"
                                        placeholder={statesPlaceholder}
                                        fieldStyle={styles.statePickerCon}
                                        onChange={(value) => console.log('value', value)}
                                    >
                                        <FlatList
                                            data={states}
                                            renderItem={({ item }) => (
                                                <Picker.Item
                                                    key={item.id}
                                                    label={item.name}
                                                    onPress={() => {
                                                        setFieldValue("state", item.id)
                                                        setStatesPlaceholder(item.name)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Picker>
                                    <Picker
                                        useSafeArea
                                        fieldType="form"
                                        onPress={getRegionsAsync}
                                        placeholderTextColor="#000"
                                        placeholder={regionsPlaceholder}
                                        fieldStyle={styles.regionPickerCon}
                                        onChange={(value) => console.log('value', value)}
                                    >
                                        <FlatList
                                            data={regions}
                                            renderItem={({ item }) => (
                                                <Picker.Item
                                                    key={item.id}
                                                    label={item.name}
                                                    onPress={() => {
                                                        setFieldValue("region", item.id);
                                                        setRegionsPlaceholder(item.name)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Picker>
                                    <PaperTextInput
                                        multiline
                                        label="Additional Info"
                                        placeholder="Additional Information"
                                        value={values.additional_information}
                                        onChangeText={handleChange("additional_information")}
                                    />
                                    <CustomButton
                                        clickHandler={handleSubmit}
                                        title={UAID ? "Update" : "Save"}
                                    />
                                    <Devider />
                                </View>
                            )
                        }}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default AddressFormScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
    },
    map: {
        height: 400,
        width: "100%",
        borderRadius: 7
    },
    formContainer: {
        flex: 1,
        zIndex: 100,
        padding: '3%',
        borderRadius: 15,
        backgroundColor: COLORS.bg_primary
    },
    line: {
        height: 5,
        width: 70,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: COLORS.primary_color
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.8,
    },
    statePickerCon: {
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        borderColor: COLORS.black_color,
    },
    regionPickerCon: {
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: -7,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        borderColor: COLORS.black_color,
    }
});
//