import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { popularBrandsEndPoint } from '../../../Home/_main/services';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Container, Devider, PopularBrandsCard } from '../../../../components';
import { allBrandsEndPoint } from '../services';

const BrandSection = () => {
    return (
        <View style={styles.container}>
            <Container title="Popular Brands" style={styles.brandsCon}  >
                {
                    popularBrandsEndPoint.map(brandInfo => (
                        <PopularBrandsCard key={brandInfo.id} {...brandInfo} />
                    ))
                }
            </Container>
            <Devider />
            <Container title="All Brands" style={styles.brandsCon}  >
                {
                    allBrandsEndPoint.map(brandInfo => (
                        <PopularBrandsCard key={brandInfo.id} {...brandInfo} />
                    ))
                }
            </Container>
            <Devider />
        </View>
    )
}

export default BrandSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding
    },
    brandsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9.1
    }
})
