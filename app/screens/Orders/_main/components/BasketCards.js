//
import React from 'react'
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formDataGenerator, sliceText } from '../../../../utils';
import { fetchPostAuthData } from '../../../../API';

const { width, height } = Dimensions.get('screen');

const BasketCard = ({ id, UPID, name, brand, category, quantity, quantity_avaliable, photo, price, reloadData = () => { } }) => {
    //
    const onRemoveCart = async () => {
        const cartInfo = { UPID: UPID };
        const formData = await formDataGenerator(cartInfo);
        const res = await fetchPostAuthData("buyer/cart/product/remove", formData);
        console.log("onRemoveCart", res);
        reloadData();
    }
    //
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    style={styles.img}
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
                    <Text style={styles.oldPrice}>
                        ${price * quantity + 5}
                    </Text>
                    <View style={styles.discountCon}>
                        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '500' }}>
                            20%
                        </Text>
                    </View>
                    <Text style={styles.price}>
                        ${price * quantity}
                    </Text>
                    <View style={styles.counterCo}>
                        <AntDesign name="left" size={20} />
                        <Text style={styles.counterText}>
                            {quantity}
                        </Text>
                        <AntDesign name="right" size={20} />
                    </View>
                </View>
            </View>
        </View>
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
        backgroundColor: COLORS.bg_primary
    },
    imageContainer: {
        borderRadius: 5,
        width: width / 3.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    img: {
        width: '100%',
        height: 100
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
    },
    itemInfo: {
        fontSize: 12,
        fontWeight: '300',
        letterSpacing: 1,
    },
    // Section Three --------------->
    sectionThree: {
        // marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    oldPrice: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500',
        textDecorationLine: 'line-through'
    },
    price: {
        fontSize: 16,
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
    }
})

