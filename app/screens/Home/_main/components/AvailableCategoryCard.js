import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
//
const { width, height } = Dimensions.get('screen');
//
const AvailableCategoryCard = ({ categoryName, categoryImageUrl }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={categoryImageUrl}
                />
            </View>
            <Text style={styles.itemName}>
                {categoryName}
            </Text>
        </View>
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
