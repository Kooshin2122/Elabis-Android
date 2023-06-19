//
import React, { useEffect, useState } from 'react';
import { formDataGenerator, sliceText } from '../../../utils';
import { ImageViewer } from './components';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SubHeader, Devider, Container, LoadingModal } from '../../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchGetData, fetchPostAuthData } from '../../../API';
import { useAppContext } from '../../../context';
import { readData } from '../../../utils/localStorage/AsyncStorage';
//
const { width, height } = Dimensions.get('screen');
//
const ProductDetailsScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState();
    const [counter, setCounter] = useState(1);
    const [productData, setProductData] = useState();
    //
    const { UPID, parentScreen } = route.params;
    const [scrollPossition, setScrollPossition] = useState();
    //
    const decreasement = () => {
        if (counter <= 1)
            return
        setCounter(counter - 1)
    }
    const onIncreasement = () => {
        setCounter(counter + 1)
    }
    //
    const getSignleProductDataAsync = async () => {
        const response = await fetchGetData(`buyer/products/view/${UPID}`, setLoading)
        setProductData(response.data[0])
        // console.log("response-----", response);
    }
    // Hiding Bottom Tab Navigation
    useEffect(() => {
        getSignleProductDataAsync()
    }, [])
    //
    const addToCart = async () => {
        const token = await readData("userInfo");
        const cartData = {
            UPID: productData.UPID,
            quantity: counter,
        }
        const formData = formDataGenerator(cartData);
        // check if the user login
        if (token.token_type == false) {
            navigate("AuthStack")
            return
        }
        const res = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading);
        console.log("response is --------->", res);
        //
        if (res.status == "added successfully")
            navigate("OrdersStack")
        else if (res.status == "A open Cart is not avaliable") {
            const creatCart = await fetchPostAuthData("buyer/cart/create",)
            const response = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading)
        }
    }
    //
    return (
        <SafeAreaView style={styles.container}>
            {loading && <LoadingModal />}
            {/* {scrollPossition > 0.5 ? <SubHeader title="Product Details" backTo={parentScreen} /> : <DetailsHeader backTo={parentScreen} />} */}
            <SubHeader title="Product Details" backTo={parentScreen} />
            <ScrollView onScroll={e => setScrollPossition(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16} showsVerticalScrollIndicator={false} >
                <ImageViewer UPID={productData?.UPID} />
                <Devider />
                <View style={styles.contentContainer}>
                    <Text style={styles.proName}>
                        {sliceText(productData?.name, 67)}
                    </Text>
                    <Devider height={10} />
                    {/* Product Details */}
                    <View>
                        <Text style={styles.title}>
                            Product Details
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '300', letterSpacing: 0.5, color: COLORS.black_color }}>
                            {productData?.description}
                        </Text>
                    </View>
                    <Devider height={10} />
                    {/* item information */}
                    <View >
                        <Text style={styles.title}>
                            Item Info
                        </Text>
                        <ItemContainer title="Item Type" value='Mirror' />
                        <ItemContainer title="Brand" value={productData?.brand?.name} />
                        <ItemContainer title="Category" value={productData?.category?.name} />
                        <ItemContainer title="Available Quantities" value={productData?.quantity_avaliable} />
                    </View>
                    <Devider />
                    {/* Controls */}
                    <View style={styles.contorllsContainer}>
                        <Text>Quantity</Text>
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
                        </View>
                    </View>
                </View>
                <Devider />
                <Devider />
                <Devider />
            </ScrollView>
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '3%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray_color,
    },
    contorllsContainer: {
        alignItems: 'center',
    },
    quantityControls: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor: 'blue'
    },
    box: {
        flex: 1,
        padding: '5%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counterTxt: {
        flex: 2,
        fontSize: 35,
        fontWeight: '500',
        textAlign: 'center',
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


const DetailsHeader = ({ backTo }) => {
    const navigation = useNavigation()
    const backToPreviousScreen = () => {
        if (backTo)
            navigation.navigate('Home')
        navigation.goBack()
        backTo = null
    }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={backToPreviousScreen} style={styles.iconCon}>
                <AntDesign name="left" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.iconCon}>
                <AntDesign name="hearto" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const ItemContainer = ({ title, value }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.itemContainer}>
            <Text style={{ fontWeight: '300', fontSize: 18 }}>
                {title}
            </Text>
            <Text style={{ fontWeight: '300', fontSize: 18 }}>
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