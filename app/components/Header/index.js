import React from 'react'
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const Header = ({ icon1 = null, label = 'screen', icon2 = 'search1', icon3 = 'hearto' }) => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack()
    }
    const goWishList = () => {
        navigation.navigate('WishListStack')
    }
    const goSearch = () => {
        navigation.navigate('Search')
    }
    return (
        <View style={styles.container}>
            <View style={LAY_OUT.flex_row}>
                {
                    icon1
                    &&
                    <TouchableOpacity onPress={goBack} style={{ marginRight: "2%", }}>
                        <AntDesign name={icon1} size={23} color='gray' />
                    </TouchableOpacity>
                }
                <Text style={styles.labelTxt}>
                    {label}
                </Text>
            </View>
            {/* left icons */}
            <View style={LAY_OUT.flex_row}>
                {
                    icon2
                    &&
                    <TouchableOpacity onPress={goSearch}>
                        <AntDesign name={icon2} size={23} style={{ marginRight: "2%" }} />
                    </TouchableOpacity>
                }
                {
                    icon3
                    &&
                    <TouchableOpacity onPress={goWishList}>
                        <AntDesign name={icon3} size={23} style={{ marginRight: "2%" }} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: LAY_OUT.paddingY,
        paddingHorizontal: LAY_OUT.paddingX,
    },
    labelTxt: {
        fontSize: 20,
        fontWeight: '500',
        textTransform: 'capitalize'
    }
})
