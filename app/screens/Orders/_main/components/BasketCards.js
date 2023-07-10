//
import React from 'react'
import { fetchPostAuthData } from '../../../../API';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { formDataGenerator, sliceText } from '../../../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const { width, height } = Dimensions.get('screen');
//
const BasketCard = ({ id, UPID, name, brand, category, quantity, quantity_avaliable, photo, price, reloadData = () => { } }) => {
    //
    const { navigate } = useNavigation();
    //
    const onViewDetails = () => {
        navigate('ProductStack', {
            screen: 'DetailsScreen',
            initial: false,
            params: {
                UPID,
                parentScreen: "OrdersStack"
            }
        });
    }
    //
    const onRemoveCart = async () => {
        const cartInfo = { UPID: UPID };
        const formData = await formDataGenerator(cartInfo);
        const res = await fetchPostAuthData("buyer/cart/product/remove", formData);
        // console.log("onRemoveCart", res);
        reloadData();
    }
    //
    return (
        <Pressable onPress={onViewDetails} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.img}
                    resizeMode="contain"
                    source={{ uri: `https://sweyn.co.uk/storage/images/${photo}` }}
                />
            </View>
            {/* Content Container ------------------------------------------------- */}
            <View style={styles.contentContainer}>
                {/* Section One --------------------------------------------------- */}
                <View style={styles.sectionOne}>
                    <Text style={styles.proName}>
                        {sliceText(name, 18)}
                    </Text>
                    <Pressable onPress={onRemoveCart} style={styles.cartRemoveCon}>
                        <MaterialCommunityIcons name="cart-remove" size={18} color="#f7847f" />
                    </Pressable>
                </View>
                {/* Section Two --------------------------------------------------- */}
                <View style={styles.sectionTwo}>
                    <Text style={styles.itemInfo}>
                        Brand: {sliceText(brand?.name, 18)}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap", overflow: 'hidden' }}>
                        <Text style={styles.itemInfo}>
                            Available Quantities: {quantity_avaliable}
                        </Text>
                    </View>

                </View>
                {/* Section Three --------------------------------------------------- */}
                <View style={styles.sectionThree}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.price}>
                            ${price}
                        </Text>
                        <Text style={styles.subtitleTxt}>
                            Single Price
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.price}>
                            {quantity}
                        </Text>
                        <Text style={styles.subtitleTxt}>
                            Quantity
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.price}>
                            ${price * quantity}
                        </Text>
                        <Text style={styles.subtitleTxt}>
                            Total Price
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default BasketCard;

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        borderRadius: 7,
        borderWidth: 0.5,
        marginBottom: '5%',
        flexDirection: 'row',
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    imageContainer: {
        height: 100,
        borderRadius: 5,
        width: width / 3.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    img: {
        height: "100%",
        width: '100%',
        borderRadius: 5,
    },
    // Contents ---------------------------------------------
    contentContainer: {
        flex: 1,
        marginLeft: '2%',
        justifyContent: 'space-between',
    },
    // Section One --------------->
    sectionOne: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    proName: {
        flex: 1,
        fontSize: 20,
        fontWeight: '400',
        letterSpacing: 0.5
    },
    cartRemoveCon: {
        borderRadius: 4,
        borderWidth: 0.7,
        padding: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#f7847f'
    },
    // Section Two --------------->
    sectionTwo: {
        // marginTop: '2%',
        paddingBottom: "4%",
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    itemInfo: {
        fontSize: 11,
        fontWeight: '400',
        letterSpacing: 0.7,
        color: "gray"
    },
    // Section Three --------------->
    sectionThree: {
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    oldPrice: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500',
        textDecorationLine: 'line-through'
    },
    price: {
        fontSize: 14,
        fontWeight: '500'
    },
    discountCon: {
        paddingVertical: '1%',
        paddingHorizontal: '6%',
        borderRadius: 40,
        backgroundColor: '#f7847f'
    },
    counterCo: {
        flex: 0.7,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        backgroundColor: COLORS.bg_tertiary
    },
    counterText: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: '3%'
    },
    subtitleTxt: {
        fontSize: 10,
        color: "gray",
        letterSpacing: 0.7
    }
})

