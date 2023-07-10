//
import { useSelector } from 'react-redux';
import { fetchGetAuthData } from '../../../../API';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { BasketCards, ServicesCard } from '../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { basketProductInfo, paymentServiceCompanies } from '../services';
import { Container, Devider, ListEmptyComponent, LoadingModal } from '../../../../components';
import { FlatList, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { readData } from '../../../../utils/localStorage/AsyncStorage';
//
const Basket = () => {
    const { navigate } = useNavigation();
    const [refresh, setRefresh] = useState(true);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState([]);
    const [cartModal, setCartModal] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    // const { isUserLogin } = useSelector(state => state.globalSlice);
    //
    const getCartDataAsync = async () => {
        try {
            setLoading(true);
            setRefresh(false);
            const response = await fetchGetAuthData("buyer/cart/view");
            setLoading(false);
            if (response.status == "successfull") {
                setCartData(response.data.cart_details);
                setCartTotal(response.data.total_price);
                setCartProducts(response.data.products_in_cart)
            }
        } catch (error) {
            setLoading(false);
            if (error == "TypeError: Cannot read property 'token_type' of null") {
                setCartData([]);
                setCartTotal(0);
                setCartProducts([]);
            }
        }
    }
    //
    useEffect(() => {
        getCartDataAsync();
    }, []);
    //
    const goCheckOutScreen = async () => {
        if (cartProducts?.length < 1) {
            setCartModal(true)
            return
        }
        const isUserLogin = await readData("userInfo");
        // Check if the user is loging
        isUserLogin ?
            navigate('OrdersStack', {
                initial: false,
                screen: "CheckOut",
                params: { cartTotal: cartTotal }
            })
            : navigate('AuthStack');
    };
    //
    return (
        <View style={styles.container}>
            {loading && <LoadingModal />}
            <View style={styles.scrollCon} >
                <FlatList
                    data={cartProducts}
                    keyExtractor={(item) => item.UPID}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListItemsCon}
                    renderItem={({ item }) => <BasketCards {...item} reloadData={getCartDataAsync} />}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={getCartDataAsync} />}
                    ListEmptyComponent={() => (
                        <ListEmptyComponent title="Your Cart Is Empty" message="Looks like you have not added anything to your cart. Go back to the products screen and add some products. or pull-up to reload data" />
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
                                            $ {cartTotal}
                                        </Text>
                                        <Text style={styles.subTitle}>
                                            Quantity: {cartProducts.length}
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
                            {
                                cartModal &&
                                <Modal
                                    transparent={true}
                                >
                                    <View style={styles.modalContainer}>
                                        <View style={styles.centeredView}>
                                            <ListEmptyComponent title="Your Cart Is Empty" message="Looks like you have not added anything to your cart. Go back to the products screen and add some products" />
                                            <Pressable onPress={() => setCartModal(false)} style={{ borderTopWidth: 0.7, borderColor: "gray", padding: "3%" }}>
                                                <Text style={{ fontSize: 18, fontWeight: "500", color: "#137cf3", letterSpacing: 0.7, textAlign: "center" }} >
                                                    OK
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                            }
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
//
export default Basket;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",
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
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.30)"
    },
    centeredView: {
        height: 330,
        padding: "4%",
        borderRadius: 10,
        paddingBottom: "1%",
        backgroundColor: COLORS.bg_primary,
    }
})
//