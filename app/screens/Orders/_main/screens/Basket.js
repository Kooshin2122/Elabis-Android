//
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { BasketCards, ServicesCard } from '../components';
import { Container, Devider, ListEmptyComponent } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { basketProductInfo, paymentServiceCompanies } from '../services';
import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchGetAuthData, fetchPostAuthData } from '../../../../API';
import { formDataGenerator } from '../../../../utils';
//
const Basket = () => {
    const { navigate } = useNavigation();
    const [refresh, setRefresh] = useState(true);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const { isUserLogin } = useSelector(state => state.globalSlice);
    //
    const getCartDataAsync = async () => {
        setLoading(true)
        setRefresh(true)
        const response = await fetchGetAuthData("buyer/cart/view");
        // console.log("response----------", response);
        if (response.status == "successfull") {
            setCartData(response.data.cart_details);
            setCartProducts(response.data.products_in_cart)
        }
        setRefresh(false)
        setLoading(false)
    }
    //
    useEffect(() => {
        getCartDataAsync();
    }, []);
    //
    const goCheckOutScreen = () => {
        // Check if the user is login
        isUserLogin ? navigate('CheckOut') : navigate('AuthStack')
    };
    //
    return (
        <View style={styles.container}>
            <View style={styles.scrollCon} >
                <FlatList
                    data={cartProducts}
                    keyExtractor={(item) => item.UPID}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListItemsCon}
                    renderItem={({ item }) => <BasketCards {...item} reloadData={getCartDataAsync} />}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={getCartDataAsync} />}
                    ListEmptyComponent={() => (
                        <ListEmptyComponent title="Sorry" message="There is not product in the cart. Pull up to reload" />
                    )}
                    ListFooterComponent={() => (
                        <View>
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
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default Basket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.padding,
    },
    flatListItemsCon: {
        paddingVertical: "4%",
    },
    checkOutCon: {
        padding: '4%',
        borderWidth: 0.6,
        borderRadius: 7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    servicesCon: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: '3%',
        borderBottomWidth: 0.7,
        borderColor: COLORS.gray_color,
        justifyContent: 'space-between',
    },
    contentCon: {
        paddingBottom: '4%',
        borderBottomWidth: 0.4,
        paddingHorizontal: '2%',
        borderColor: COLORS.gray_color,
    },
    title: {
        fontSize: 16,
        marginBottom: 3,
        fontWeight: '500',
        letterSpacing: 0.7,
        textTransform: 'uppercase',
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
