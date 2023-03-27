//
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//Redux tool kit
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectYear } from '../../../../ReduxStore/ProductScreenSlice';

const MonufactorYearCard = ({ year }) => {
    const dispatch = useDispatch()
    const { selectYear } = useSelector(state => state.productsSlice)

    const onSelectYear = () => {
        dispatch(changeSelectYear(year))
    }

    const isActive = useMemo(() => {
        return selectYear == year
    }, [selectYear])

    return (
        <TouchableOpacity onPress={onSelectYear} style={[styles.container, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color, }]} activeOpacity={0.6}>
            <Text style={styles.textSize}>
                {year}
            </Text>
        </TouchableOpacity>
    )
}

export default MonufactorYearCard;

const styles = StyleSheet.create({
    container: {
        width: '23%',
        borderWidth: 1,
        alignItems: 'center',
        paddingVertical: '3%',
        borderRadius: 7,
        borderColor: COLORS.gray_color
    },
    textSize: {
        fontSize: 18,
        fontWeight: '300'
    }
})
