//
import React from 'react';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
//
import { sliceText } from '../../../../utils';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
//
const { width } = Dimensions.get('screen')
//
const FilterBox = ({ title = 'Category', selectItem = 'Select Item' }) => {
    const { navigate } = useNavigation();

    const navigateFilteringScreen = () => {
        navigate('FilteringScreen')
    }

    return (
        <Pressable style={styles.container} onPress={navigateFilteringScreen}>
            <Text style={styles.titleText}>
                {title}
            </Text>
            <View style={LAY_OUT.flex_row}>
                <Text style={styles.selectItemText}>
                    {sliceText(selectItem, 5)}
                </Text>
                <AntDesign name="down" size={18} style={styles.selectItemText} />
            </View>
        </Pressable>
    )
}

export default FilterBox;

const styles = StyleSheet.create({
    container: {
        width: width / 4,
        paddingHorizontal: '2%',
        borderRightWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    titleText: {
        fontWeight: '300',
        letterSpacing: 0.6
    },
    selectItemText: {
        fontWeight: '500',
        textTransform: 'uppercase'
    }
})
