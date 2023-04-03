//
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
//
const SelectableCategoryCon = ({ categoryName }) => {
    //
    const [selectCategory, setSelectCategory] = useState(false)
    const onSelectCategory = () => {
        setSelectCategory(!selectCategory)
    }
    //
    return (
        <Pressable onPress={onSelectCategory} style={styles.container}>
            <MaterialCommunityIcons
                size={25}
                color={COLORS.primary_color}
                name={selectCategory ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
            />
            <Text style={styles.categoryName}>
                {categoryName}
            </Text>
        </Pressable>
    )
}
//
export default SelectableCategoryCon;
//
const styles = StyleSheet.create({
    container: {
        columnGap: 10,
        marginBottom: '3%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 16,
        color: COLORS.black_color
    }
})
//