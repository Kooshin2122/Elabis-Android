import React from 'react';
import Devider from '../Devider';
import { sliceText } from '../../utils';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const { height } = Dimensions.get('screen');
//
const ProductCard = ({ UPID, shop_id, name, brand, price, photo, rating, quantity_avaliable, productName, productPrice, productBrandName, productImageUrl, parentScreen = null }) => {
    const { navigate } = useNavigation();
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
    return (
        <View style={styles.container}>
            <Pressable onPress={navigateDetailsScreen}>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={{ uri: `https://sweyn.co.uk/storage/images/${photo}` }}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {/* Product Name */}
                    <Text style={styles.proName}>
                        {sliceText(name, 40)}
                    </Text>
                    {/* product Brand Name */}
                    <Devider height={5} />
                    <Text style={styles.proBrandName}>
                        Brand : {brand?.name}
                    </Text>
                    <View style={LAY_OUT.flex_row}>
                        <Text style={styles.proBrandName}>
                            Quantity : {quantity_avaliable}
                        </Text>
                        <Text style={[styles.proBrandName, { letterSpacing: 2, fontWeight: "bold", color: "orange" }]}>
                            {rating}
                            <AntDesign name="star" size={12} color="orange" />
                        </Text>
                    </View>
                </View>
            </Pressable>
            <Devider height={10} />
            <View style={styles.controlsCon}>
                <View style={[LAY_OUT.flex_row, { alignSelf: 'flex-end' }]}>
                    <Pressable style={styles.iconCon}>
                        <MaterialCommunityIcons name="cards-heart-outline" size={18} />
                    </Pressable>
                    <Pressable style={styles.iconCon}>
                        <MaterialCommunityIcons name="cart-plus" size={18} />
                    </Pressable>
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
