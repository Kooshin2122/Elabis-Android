import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { SubHeader } from '../../../components'
import { COLORS } from '../../../Theme/GLOBAL_STYLES'

const ShopsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="SHOPS" />
            <Text>ShopsScreen</Text>
            <Button title="Next" onPress={() => navigation.navigate('ProductsScreen')} />
        </SafeAreaView>
    )
}

export default ShopsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    }
})
