//
import React, { useEffect } from 'react';
import { Devider } from '../../../../components';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import Octicons from 'react-native-vector-icons/Octicons';
import { ActivityIndicator, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showPaymentErrorModal, showPaymentLoadingModal, showPaymentSuccessfullModal } from '../../../../ReduxStore/OrdersSlice';

const PaymentLoadingModal = ({ modalVisible, changeModalVisible = () => { } }) => {
    const dispatch = useDispatch();
    //=>{}
    const onLoading = async () => {
        setTimeout(() => {
            dispatch(showPaymentLoadingModal())
            dispatch(showPaymentSuccessfullModal())
            // dispatch(showPaymentErrorModal())
        }, 3000)
    }
    useEffect(() => {
        onLoading()
    }, [])
    //
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <Pressable style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size={Platform.OS == 'ios' ? 50 : 50} />
                    <Devider height={7} />
                    {/* Content Container */}
                    <View style={styles.contentCon}>
                        <Text style={styles.title}>
                            Completing payment process
                        </Text>
                        <Text style={styles.subTitle}>
                            Please check the mobile where this sim card (+252 615 084712) is plugged
                        </Text>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

export default PaymentLoadingModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '87%',
        borderRadius: 7,
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '7%',
        paddingHorizontal: '5%',
        backgroundColor: 'white',
    },
    contentCon: {
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: '2%',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center'
    },
    controlsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '50%',
        padding: '3%',
        borderTopWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    cancelBtn: {
        borderRightWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    buttonTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: '#137cf3'
    }
})

