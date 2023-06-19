//
import React from 'react';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectBrand } from '../../ReduxStore/ProductScreenSlice';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const { width, height } = Dimensions.get('screen')
//
const PopularBrandsCard = ({ id, name, logo, brandName, brandImageUrl, parentScreen = null, style = {} }) => {
    //
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { selectBrand } = useSelector(state => state.productsSlice);
    //
    const navigateToBrandsScreen = () => {
        navigate('ProductStack', {
            initial: false,
            screen: "ProductsScreen",
        })
        dispatch(changeSelectBrand({ id: id, name: name }))
    }
    //
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={navigateToBrandsScreen} style={[styles.container, style]}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: `https://sweyn.co.uk/storage/images/brands/${logo}` }}
            />
        </TouchableOpacity>
    )
}
//
export default PopularBrandsCard;
//
const styles = StyleSheet.create({
    container: {
        height: 65,
        width: width / 4.6,
        borderWidth: 0.6,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    image: {
        width: '80%',
        height: '80%'
    }
})
