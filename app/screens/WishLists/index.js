//
import React from 'react';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { mostViewedProducts } from '../Home/_main/services';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, Devider, Header, ProductCard } from '../../components';
//
const { width, height } = Dimensions.get('screen');
//
const WishListScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header label="Wish List" />
            <ScrollView style={styles.scrollViewCon}>
                <Container title="Most Viewed Products" style={styles.categoriesCon}  >
                    {
                        mostViewedProducts.map((item) => (
                            <ProductCard key={item.id} {...item} parentScreen="HomeStack" />
                        ))
                    }
                </Container>
                <Devider />
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default WishListScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollViewCon: {
        padding: '3%'
    },
    categoriesCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
})
//