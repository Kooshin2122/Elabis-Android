//
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { changeActiveTab, changeSelectCategory } from '../../../../ReduxStore/ProductScreenSlice';
//
const { width, height } = Dimensions.get('screen');
//
const AvailableCategoryCard = ({ id, name, icon, categoryName, categoryImageUrl }) => {
    //
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    //
    const navigateProductsScreen = () => {
        navigate('ProductStack')
        dispatch(changeActiveTab(true));
        dispatch(changeSelectCategory({ id: id, name: name }))
    }
    //
    return (
        <TouchableOpacity onPress={navigateProductsScreen} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{ uri: `https://sweyn.co.uk/storage/images/categories/${icon}` }}
                />
            </View>
            <Text style={styles.itemName}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default AvailableCategoryCard;

const styles = StyleSheet.create({
    container: {
        width: '23%',
        marginBottom: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        height: 70,
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    image: {
        width: '80%',
        height: '80%'
    },
    itemName: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center'
    }
})
