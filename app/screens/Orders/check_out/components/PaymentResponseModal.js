//
import React, { useEffect } from 'react';
import { Devider } from '../../../../components';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import Octicons from 'react-native-vector-icons/Octicons';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showPaymentErrorModal, showPaymentLoadingModal, showPaymentSuccessfullModal } from '../../../../ReduxStore/OrdersSlice';

const PaymentResponseModal = ({ iconName, title, discription, modalVisible, changeModalVisible = () => { } }) => {
    const dispatch = useDispatch();
    //
    const onCloseModal = () => {
        if (iconName == 'stop')
            dispatch(showPaymentErrorModal())
        else
            dispatch(showPaymentSuccessfullModal())
    }
    //
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <Pressable onPress={onCloseModal} style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Octicons name={iconName} size={50} color={iconName == 'check-circle' ? 'green' : 'red'} />
                    <Devider height={7} />
                    {/* Content Container */}
                    <View style={styles.contentCon}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.subTitle}>
                            {discription}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

export default PaymentResponseModal;

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

