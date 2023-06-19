import React, { useEffect, useMemo, useState } from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectCategory } from '../../../../ReduxStore/ProductScreenSlice'
import { fetchGetData } from '../../../../API';

const SideBarCards = ({ id, name, icon, changeSellectSubCategoryData = () => { } }) => {
    const dispatch = useDispatch();
    const { selectCategory } = useSelector(state => state.productsSlice)
    // Main Function
    const onSelectCategory = async () => {
        changeSellectSubCategoryData([]);
        dispatch(changeSelectCategory({ id: id, name: name }))
        const subCategoryRes = await fetchGetData(`buyer/category/view/main/${id}`);
        changeSellectSubCategoryData(subCategoryRes.data);
    }
    //
    useEffect(() => {
    }, [])
    // get active category
    const activeCategory = useMemo(() => {
        return selectCategory.name == name;
    }, [selectCategory])
    // JSX
    return (
        <Pressable onPress={onSelectCategory} style={styles.container}>
            <View style={activeCategory ? styles.activeImageContainer : styles.inActiveImageContainer}>
                <Image
                    source={{ uri: `https://sweyn.co.uk/storage/images/catgeories/${icon}` }}
                    resizeMode="contain"
                    style={{ width: '45%', height: '50%' }}
                />
            </View>
            <Text style={activeCategory ? styles.activeText : styles.inActiveText}>
                {name}
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
        height: 55,
        marginBottom: 2,
        borderRadius: 55 / 2,
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
        height: 55,
        marginBottom: 2,
        borderRadius: 55 / 2,
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
