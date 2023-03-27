import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectCategory } from '../../../../ReduxStore/ProductScreenSlice'

const SideBarCards = ({ id, categoryName, categoryImageUrl }) => {
    const dispatch = useDispatch()
    const { selectCategory } = useSelector(state => state.productsSlice)
    // Main Function
    const onSelectCategory = () => {
        dispatch(changeSelectCategory(categoryName))
    }
    // get active category
    const activeCategory = useMemo(() => {
        return selectCategory == categoryName;
    }, [selectCategory])
    // JSX
    return (
        <Pressable onPress={onSelectCategory} style={styles.container}>
            <View style={activeCategory ? styles.activeImageContainer : styles.inActiveImageContainer}>
                <Image
                    source={categoryImageUrl}
                    resizeMode="contain"
                    style={{ width: '45%', height: '50%' }}
                />
            </View>
            <Text style={activeCategory ? styles.activeText : styles.inActiveText}>
                {categoryName}
            </Text>
        </Pressable>
    )
}

export default SideBarCards;

const styles = StyleSheet.create({
    container: {
        minHeight: 70,
        width: '100%',
        marginTop: 12,
        marginBottom: 8,
    },
    activeImageContainer: {
        width: 55,
        height: 50,
        marginBottom: 2,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.tertiary_color
    },
    activeText: {
        fontSize: 11,
        textAlign: 'center',
        color: COLORS.primary_color,
    },
    inActiveImageContainer: {
        width: 55,
        height: 50,
        marginBottom: 2,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    inActiveText: {
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'center',
    },

})
