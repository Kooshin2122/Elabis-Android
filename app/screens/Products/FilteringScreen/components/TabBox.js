import React, { useMemo } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';

const { width, height } = Dimensions.get('screen');

const TabBox = ({ name, selectTab, changeSelectTab = () => { } }) => {
    const onSelectTab = () => {
        changeSelectTab(name)
    }
    const isActive = useMemo(() => {
        return name == selectTab
    }, [selectTab])

    return (
        <Pressable onPress={onSelectTab} style={[styles.container, { backgroundColor: isActive ? COLORS.tertiary_color : COLORS.bg_primary, borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
            <Text style={styles.nameText}>
                {name}
            </Text>
            <Text style={styles.counter}>
                0
            </Text>
        </Pressable>
    )
}

export default TabBox;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: '10%',
        paddingHorizontal: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameText: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 1,
    },
    counter: {
        color: 'red',
        fontSize: 14,
        fontWeight: '500',
    }
})
