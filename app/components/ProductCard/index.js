import React from 'react';
import { sliceText } from '../../utils';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductCard = ({ productName, productPrice, productBrandName, productImageUrl, parentScreen = null }) => {
    const { navigate } = useNavigation();

    const navigateDetailsScreen = () => {
        navigate('ProductStack', {
            screen: 'DetailsScreen',
            initial: false,
            params: {
                productName,
                productPrice,
                productImageUrl,
                productBrandName,
                parentScreen
            }
        })
    }

    return (
        <Pressable onPress={navigateDetailsScreen} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={productImageUrl}
                />
            </View>
            <View style={styles.contentContainer}>
                {/* Product Name */}
                <Text style={styles.proName}>
                    {sliceText(productName)}
                </Text>
                {/* product Brand Name */}
                <Text style={styles.proBrandName}>
                    Brand : {productBrandName}
                </Text>
                <View style={styles.controlsCon}>
                    <Text style={styles.proPrice}>
                        ${productPrice}
                    </Text>
                    <View style={[LAY_OUT.flex_row, { alignSelf: 'flex-end' }]}>
                        <Pressable style={styles.iconCon}>
                            <MaterialCommunityIcons name="cards-heart-outline" size={18} />
                        </Pressable>
                        <Pressable style={styles.iconCon}>
                            <MaterialCommunityIcons name="cart-plus" size={18} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        width: '48%',
        height: 220,
        padding: '2%',
        borderRadius: 7,
        borderWidth: 0.5,
        marginBottom: '4%',
        borderColor: COLORS.gray_color
    },
    imageContainer: {
        flex: 1.2,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    image: {
        width: '80%',
        height: '80%'
    },
    contentContainer: {
        flex: 1,
        paddingVertical: '2%'
    },
    proName: {
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    proBrandName: {
        fontWeight: '300'
    },
    controlsCon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconCon: {
        padding: '5%',
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
    },
    proPrice: {
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'flex-end'
    },
})