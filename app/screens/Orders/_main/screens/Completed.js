//
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { ProductStatusCard } from '../components';
import { basketProductInfo } from '../services';

const Completed = () => {
    return (
        <ScrollView style={styles.container}>
            <Devider />
            {
                basketProductInfo.map((item) => <ProductStatusCard key={item.id} {...item} />)
            }
        </ScrollView>
    )
}

export default Completed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    }
})
