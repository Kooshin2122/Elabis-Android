//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
//
const SelectedItemsCard = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text>SelectedItemsCard</Text>
            <AntDesign name="close" size={18} />
        </View>
    )
}
//
export default SelectedItemsCard;
//
const styles = StyleSheet.create({
    container: {
        columnGap: 10,
        borderRadius: 40,
        marginRight: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.light_green_color,
    }
})
//