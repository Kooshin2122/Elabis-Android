//
import React from 'react';
import { FilterBox } from './components';
import { useSelector } from 'react-redux';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, Devider, ProductCard, SubHeader } from '../../../components';
import { mostViewedProducts } from '../../Home/_main/services';

const ProductsScreen = () => {
    const { selectSubCategory, selectBrand, selectModel, selectYear } = useSelector((state) => state.productsSlice)
    return (
        <SafeAreaView style={styles.contianer}>
            <SubHeader title="products" />
            {/* Filtering box */}
            <View style={styles.filterBoxesContainer}>
                <FilterBox title="Category" selectItem={selectSubCategory} />
                <FilterBox title="Part-Brand" selectItem={selectBrand} />
                <FilterBox title="Model" selectItem={selectModel} />
                <FilterBox title="Year" selectItem={selectYear} />
            </View>
            {/* Products Section */}
            <ScrollView style={styles.scollCon}>
                <Devider />
                <View style={styles.productsCon}  >
                    {
                        mostViewedProducts.map(productInfo => (
                            <ProductCard key={productInfo.id} {...productInfo} />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductsScreen;

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    filterBoxesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    scollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    productsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
})
