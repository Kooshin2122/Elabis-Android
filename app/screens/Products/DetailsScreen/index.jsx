//
import React, { useEffect, useState } from 'react';
import { formDataGenerator, sliceText } from '../../../utils';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ImageCarousel, ProductDetailCard } from './components';
import { SubHeader, Devider, Container, LoadingModal, PaperTextInput, CustomButton } from '../../../components';
import { Dimensions, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchGetData, fetchPostAuthData } from '../../../API';
import { useAppContext } from '../../../context';
import { getDistance, } from "geolib"
import { readData } from '../../../utils/localStorage/AsyncStorage';
//
const { width, height } = Dimensions.get('screen');
//
const ProductDetailsScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState();
    const [images, setImages] = useState([]);
    const [counter, setCounter] = useState(1);
    const [distance, setDistance] = useState(0);
    const [shopData, setShopData] = useState([]);
    const [productData, setProductData] = useState();
    const { userLocation, setUserLocation, } = useAppContext();
    //
    const { UPID, parentScreen } = route.params;
    //
    const decreasement = () => {
        if (counter <= 1)
            return
        setCounter(counter - 1)
    }
    const onIncreasement = () => {
        if (counter > productData?.quantity_avaliable)
            return
        setCounter(counter + 1)
    }
    //
    const calculateDistance = (shopLocation = {}) => {
        const userLoc = {
            latitude: userLocation?.coords.latitude,
            longitude: userLocation?.coords.longitude,
        }
        let dis = getDistance(userLoc, shopLocation);
        setDistance(dis)
    }
    //
    const getSignleProductDataAsync = async () => {
        setLoading(true);
        const response = await fetchGetData(`buyer/products/view/${UPID}`)
        setProductData(response.data[0]);
        setImages(response.images);
        const shopRes = await fetchGetData(`buyer/shop/view/${response.data[0]?.shop_id}`);
        setShopData(shopRes.data);
        setLoading(false);
        const shopLocation = { latitude: shopRes?.data.latitude, longitude: shopRes?.data.longitude }
        calculateDistance(shopLocation);
    }
    // Hiding Bottom Tab Navigation
    useEffect(() => {
        getSignleProductDataAsync()
    }, [])
    //
    const addToCart = async () => {
        const token = await readData("userInfo");
        // check if the user login
        if (token == null) {
            navigate("AuthStack")
            return
        }
        //
        const cartData = {
            UPID: productData.UPID,
            quantity: counter,
        }
        //
        const formData = formDataGenerator(cartData);
        const res = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading);
        //
        if (res.status == "added successfully")
            navigate("OrdersStack")
        else if (res?.status == "A open Cart is not avaliable") {
            const creatCart = await fetchPostAuthData("buyer/cart/create",)
            const response = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading)
        }
    }
    //
    return (
        <SafeAreaView style={styles.container}>
            {loading && <LoadingModal />}
            <SubHeader title="Product Details" backTo={parentScreen} />
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} >
                    {/* image Carousel */}
                    <ImageCarousel images={images} />
                    <View style={styles.contentContainer}>
                        <Devider />
                        <ProductDetailCard
                            distance={distance}
                            name={shopData?.name}
                            addToCart={addToCart}
                            email={shopData?.email}
                            UPID={productData?.UPID}
                            photo={shopData?.photos}
                            landmark={shopData?.landmark}
                            phone_number={shopData?.phone_number}
                        />
                        <Devider height={10} />
                        {/* item information */}
                        <View style={styles.itemInfoMainContainer} >
                            <Text style={styles.title}>
                                Item Info
                            </Text>
                            <ItemContainer title="Item Type" value={productData?.productcategory.name} />
                            <ItemContainer title="Brand" value={productData?.brand?.name} />
                            <ItemContainer title="Category" value={productData?.category?.name} />
                            <ItemContainer title="Single Price" value={`$${productData?.price}`} />
                            <ItemContainer title="Available Quantities" value={productData?.quantity_avaliable} />
                        </View>
                        <Devider />
                        {/* Product Details */}
                        <View style={styles.itemInfoMainContainer}>
                            <Text style={styles.title}>
                                Product Details
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', letterSpacing: 0.5, color: "gray" }}>
                                {productData?.description}
                            </Text>
                        </View>
                        <Devider />
                        {/* Controls */}
                        <View style={styles.contorllsContainer}>
                            <View style={styles.contorllsHead}>
                                <View>
                                    <Text style={styles.counterTxt}>
                                        {counter}
                                    </Text>
                                    <Text style={styles.subTitle}>Quantity</Text>
                                </View>
                                <View>
                                    <Text style={styles.totalPrice}>
                                        ${productData?.price * counter}
                                    </Text>
                                    <Text style={styles.subTitle}>Total Price</Text>
                                </View>
                            </View>
                            <Devider />
                            <View style={styles.quantityControls}>
                                <Pressable onPress={decreasement} style={[styles.box, { borderRightWidth: 1, }]}>
                                    <AntDesign name="minus" size={25} />
                                </Pressable>
                                <View style={styles.counterView}>
                                    <Text style={[styles.counterTxt, { textAlign: "center", fontSize: 22 }]}>
                                        {counter}
                                    </Text>
                                </View>
                                <Pressable onPress={onIncreasement} style={styles.box}>
                                    <AntDesign name="plus" size={25} />
                                </Pressable>
                            </View>
                            <Devider />
                            <CustomButton
                                title="Add On Cart"
                                clickHandler={addToCart}
                            />
                        </View>
                        <Devider />
                        <Devider />
                        <Devider />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '3%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_tertiary
    },
    iconCon: {
        width: 37,
        height: 37,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00000097",
        // opacity: 0.8
        // backgroundColor: COLORS.black_color
    },
    contentContainer: {
        zIndex: 1000,
        paddingTop: "1%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: COLORS.bg_primary,
        paddingHorizontal: LAY_OUT.paddingX,
    },
    proName: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.9,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 18, fontWeight: "500",
        marginBottom: 5, letterSpacing: 1,
        color: COLORS.black_color,
    },
    itemInfoMainContainer: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '3%',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray_color,
    },
    contorllsContainer: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    contorllsHead: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    quantityControls: {
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
    },
    box: {
        padding: '4%',
        borderLeftWidth: 0.7,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    counterView: {
        flex: 1,
        alignItems: "center",
    },
    counterTxt: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primary_color
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: "right",
        color: COLORS.primary_color
    },
    subTitle: {
        fontSize: 14,
        color: "gray",
        fontWeight: "400",
    },
    paymentsControls: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        padding: '3%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary_color,
    },
    priceTxt: {
        fontSize: 17,
        fontWeight: '500',
        color: "#ffffff"
    },
    price: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center'
    }
})
//
const ItemContainer = ({ title, value }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.itemContainer}>
            <Text style={{ fontWeight: '300', fontSize: 15, color: "gray" }}>
                {title}
            </Text>
            <Text style={{ fontWeight: '400', fontSize: 15, color: "#394043" }}>
                {value}
            </Text>
        </View>
    )
}

// getParent().setOptions({ tabBarStyle: { display: 'none' } })
// return () => {
//     getParent().setOptions({
//         tabBarStyle: {
//             display: 'flex',
//             borderTopColor: 'rgba(0, 0, 0, .2)',
//             paddingTop: Platform.OS === 'android' ? 15 : 10,
//             paddingBottom: Platform.OS === 'android' ? 15 : 30,
//             height: Platform.OS === 'android' ? 70 : 90,
//         }
//     })
// }

{/* <Text>Quantity</Text>
                        <View style={styles.quantityControls}>
                            <Pressable onPress={decreasement} style={styles.box}>
                                <AntDesign name="minus" size={25} />
                            </Pressable>
                            <Text style={styles.counterTxt}>
                                {counter}
                            </Text>
                            <Pressable onPress={onIncreasement} style={styles.box}>
                                <AntDesign name="plus" size={25} />
                            </Pressable>
                        </View>
                        <Devider />
                        <View style={styles.paymentsControls}>
                            <View style={styles.btn}>
                                <Text style={styles.priceTxt}>
                                    Pay Now
                                </Text>
                                <FontAwesome name="money" size={20} color='#fff' style={{ marginLeft: 10 }} />
                            </View>
                            <Text style={styles.price}>
                                $ {productData?.price * counter}
                            </Text>
                            <Pressable onPress={addToCart} style={styles.btn}>
                                <Text style={styles.priceTxt}>
                                    Add Cart
                                </Text>
                                <MaterialCommunityIcons name="cart-check" size={20} color='#fff' style={{ marginLeft: 10 }} />
                            </Pressable>
                        </View> */}