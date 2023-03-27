import React from 'react'
import Devider from '../Devider';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Container = ({ title = "Container", seeMore = false, navigationScreenName = 'Home', children, style = {} }) => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <View style={LAY_OUT.flex_row}>
                <Text style={styles.Title}>
                    {title}
                </Text>
                {
                    seeMore &&
                    <Pressable onPress={() => navigate(navigationScreenName)}>
                        <Text style={styles.seeMoreTxt}>
                            see more
                        </Text>
                    </Pressable>
                }
            </View>
            <Devider height={10} />
            <View style={{ ...style }}>
                {children}
            </View>
        </View>
    )
}

export default Container;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 0.3
    },
    Title: {
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: COLORS.black_color
    },
    seeMoreTxt: {
        fontSize: 15,
        fontWeight: '400',
        textTransform: 'uppercase',
        color: COLORS.black_color
    }
})
