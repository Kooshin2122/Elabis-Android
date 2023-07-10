import React, { useEffect, useState } from 'react';
import Devider from '../Devider';
import { formDataGenerator, sliceText } from '../../utils';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchPostAuthData } from '../../API';
import { readData, removeData, storeData } from '../../utils/localStorage/AsyncStorage';
//
const { height } = Dimensions.get('screen');
//
const ProductCard = ({ id, UPID, shop_id, name, brand, price, photo, rating, quantity_avaliable, parentScreen = null, reloadScreen = () => { } }) => {
    const { navigate } = useNavigation();
    const [cartLoading, setCartLoading] = useState(false);
    const [isInWishList, setIsInWishList] = useState(false);
    const [heartLoading, setHeartLoading] = useState(false);
    //
    const navigateDetailsScreen = () => {
        navigate('ProductStack', {
            screen: 'DetailsScreen',
            initial: false,
            params: {
                UPID,
                parentScreen
            }
        });
    }
    //
    const onAddToCart = async () => {

    }
    //
    const storeWishListProductsAsync = async () => {
        //
        const productToBeSaved = UPID
        const existingProducts = await readData("wishListProducts");
        console.log("existingProducts---------->", existingProducts);
        //
        let newProduct = [productToBeSaved]
        if (existingProducts) {
            const check = existingProducts.find(element => element === productToBeSaved);
            check ? newProduct = existingProducts : newProduct = [...existingProducts, productToBeSaved];
        }
        // Store Data
        await storeData("wishListProducts", newProduct);
        // await removeData("wishListProducts");
    }
    const removeWishListProductAsync = async () => {
        //
        const productToBeSaved = UPID
        const existingProducts = await readData("wishListProducts");
        console.log("existingProducts---------->", existingProducts);
        //
        let newProducts = [];
        if (existingProducts) {
            const products = existingProducts.filter(element => element !== productToBeSaved);
            newProducts = products;
            console.log("newProducts---------->", newProducts);
        }
        // // Store Data
        // await storeData("wishListProducts", newProduct);
        // // await removeData("wishListProducts");
    }
    //
    const onAddToWishList = async () => {
        const payload = { UPID };
        const formData = await formDataGenerator(payload);
        storeWishListProductsAsync();
        setIsInWishList(true);
        const res = await readData("userInfo");
        if (res) {
            const result = await fetchPostAuthData("buyer/wishlist/add", formData, setHeartLoading);
        }
        else navigate("AuthStack")
    }
    //
    const onRemoveFromWishList = async () => {
        const payload = { id };
        const formData = await formDataGenerator(payload);

    }
    //
    const checkProductIsInWishListAsync = async () => {
        const res = await readData("wishListProducts");
        res?.filter((id) => {
            if (id == UPID) {
                setIsInWishList(true)
            }
        })
    }
    //
    useEffect(() => {
        checkProductIsInWishListAsync();
    }, [])
    //
    return (
        <View style={styles.container}>
            <Pressable onPress={navigateDetailsScreen}>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: `https://sweyn.co.uk/storage/images/${photo}` }}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {/* Product Name */}
                    <Text style={styles.proName}>
                        {sliceText(name, 15)}
                    </Text>
                    {/* product Brand Name */}
                    <Devider height={5} />
                    <Text style={styles.proBrandName}>
                        Brand : {brand?.name}
                    </Text>
                    <View style={LAY_OUT.flex_row}>
                        <Text style={styles.proBrandName}>
                            Quantity : {sliceText(quantity_avaliable, 5)}
                        </Text>
                        <Text style={[styles.proBrandName, { letterSpacing: 2, fontWeight: "bold", color: "orange" }]}>
                            <AntDesign name="star" size={12} color="orange" />
                            {rating}.0
                        </Text>
                    </View>
                </View>
            </Pressable>
            <Devider height={10} />
            <View style={styles.controlsCon}>
                <View style={[LAY_OUT.flex_row, { alignSelf: 'flex-end' }]}>
                    {
                        heartLoading ? <ActivityIndicator size="small" />
                            :
                            <Pressable onPress={isInWishList ? onRemoveFromWishList : onAddToWishList} style={styles.iconCon}>
                                <MaterialCommunityIcons
                                    size={18}
                                    color={isInWishList ? COLORS.primary_color : "black"}
                                    name={isInWishList ? "cards-heart" : "cards-heart-outline"}
                                />
                            </Pressable>
                    }
                    {
                        cartLoading ? <ActivityIndicator size="small" />
                            :
                            <Pressable onPress={onAddToCart} style={styles.iconCon}>
                                <MaterialCommunityIcons name="cart-plus" size={18} />
                            </Pressable>
                    }

                </View>
                <Text style={styles.proPrice}>
                    ${price}
                </Text>
            </View>
        </View>

    )
}
//
export default ProductCard;
//
const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        width: '46%',
        padding: '2%',
        borderRadius: 7,
        borderWidth: 0.5,
        marginBottom: '4%',
        marginHorizontal: "2%",
        borderColor: COLORS.gray_color,
        justifyContent: 'space-between',
        backgroundColor: COLORS.bg_primary,
    },
    imageContainer: {
        height: 110,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 7,
    },
    contentContainer: {
        marginTop: '7%'
    },
    proName: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: COLORS.black_color,
        textTransform: 'uppercase',
    },
    proBrandName: {
        fontSize: 12,
        fontWeight: '300'
    },
    controlsCon: {
        paddingTop: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderColor: COLORS.gray_color,
        justifyContent: 'space-between',
    },
    iconCon: {
        padding: '5%',
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
    },
    proPrice: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: 'flex-end',
        color: COLORS.primary_color
    },
})
