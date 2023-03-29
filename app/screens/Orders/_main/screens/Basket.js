//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { BasketCards, ServicesCard } from '../components';
import { Container, Devider } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { basketProductInfo, paymentServiceCompanies } from '../services';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const Basket = () => {
    const { navigate } = useNavigation()
    const goCheckOutScreen = () => {
        navigate('CheckOut')
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollCon} showsVerticalScrollIndicator={false} >
                <Devider />
                {
                    basketProductInfo.map((item) => <BasketCards key={item.id} {...item} />)
                }
                {/* Check-out */}
                <View style={styles.checkOutCon}>
                    <Container title="We Accept" style={styles.servicesCon} >
                        {
                            paymentServiceCompanies.map((item) => <ServicesCard key={item.id} {...item} />)
                        }
                    </Container>
                    <Devider />
                    <View style={[LAY_OUT.flex_row, styles.contentCon]}>
                        <View>
                            <Text style={styles.title}>
                                Basket Total
                        </Text>
                            <Text style={styles.subTitle}>
                                Quantity: 5
                        </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }} >
                            <Text style={styles.priceTxt}>
                                $ 90
                        </Text>
                            <Text style={styles.subTitle}>
                                Quantity: 5
                        </Text>
                        </View>
                    </View>
                    <Devider />
                    <Pressable onPress={goCheckOutScreen} style={styles.checkOutBtn}>
                        <Text style={styles.checkOutBtnTxt}>
                            Check-out
                        </Text>
                    </Pressable>
                </View>
                <Devider />
                <Devider />
            </ScrollView>
        </View>
    )
}

export default Basket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_secondary
    },
    scrollCon: {
        flex: 1,
        padding: LAY_OUT.padding,
    },
    checkOutCon: {
        padding: '4%',
        borderWidth: 0.6,
        borderRadius: 7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    servicesCon: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: '3%',
        borderBottomWidth: 1,
        borderColor: COLORS.gray_color,
        justifyContent: 'space-between',
    },
    contentCon: {
        paddingBottom: '4%',
        borderBottomWidth: 1,
        paddingHorizontal: '2%',
        borderColor: COLORS.gray_color,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.7,
        marginBottom: 3,
        textTransform: 'uppercase'
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '300',
        letterSpacing: 0.7
    },
    priceTxt: {
        fontSize: 16,
        fontWeight: '600',
    },
    checkOutBtn: {
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: '3.5%',
        backgroundColor: COLORS.primary_color
    },
    checkOutBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.6,
        textTransform: 'uppercase'
    }
})
