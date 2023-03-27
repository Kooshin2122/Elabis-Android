//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { changeSelectSubCategory } from '../../../../ReduxStore/ProductScreenSlice';

const CategoriesCard = ({ id, categoryName, categoryImageUrl }) => {
    const dispatch = useDispatch();
    const { selectSubCategory } = useSelector((state) => state.productsSlice);
    const { navigate } = useNavigation()
    const onSelectCategory = () => {
        // Navigate prducts screen
        navigate('ProductsScreen')
        dispatch(changeSelectSubCategory(categoryName))
    }

    return (
        <TouchableOpacity onPress={onSelectCategory} style={styles.container} activeOpacity={0.6}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={categoryImageUrl}
                />
            </View>
            <Text style={styles.catName}>
                {categoryName}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoriesCard;

const styles = StyleSheet.create({
    container: {
        width: '30%',
        marginBottom: '5%',
        alignItems: 'center',
    },
    imageContainer: {
        width: 55,
        height: 55,
        borderRadius: 40,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    image: {
        width: '70%',
        height: '70%'
    },
    catName: {
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'center',
    }
})
