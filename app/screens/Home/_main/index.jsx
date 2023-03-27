//
import React from 'react';
import { availableCategoriesEndPoint, mostViewedProducts, popularBrandsEndPoint, specialOffersEndPoint } from './services';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { HomeHeader, SpecialCards, AvailableCategoryCard, HomeSkeleton } from './components';
import { Devider, MyStatusBar, Container, PopularBrandsCard, ProductCard } from '../../../components';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, Button, FlatList } from 'react-native';
//
const HomeScreen = () => {
    const { navigate } = useNavigation()
    return (
        <SafeAreaView style={styles.mainContainer}>
            <MyStatusBar />
            {/* Skeleton Loading */}
            {/* <HomeSkeleton /> */}
            <HomeHeader />
            <ScrollView style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <Devider />
                <View style={styles.container}>
                    <Container title="Popular Brands" seeMore style={styles.brandsCon}  >
                        {
                            popularBrandsEndPoint.map(brandInfo => (
                                <PopularBrandsCard key={brandInfo.id} {...brandInfo} parentScreen="HomeStack" />
                            ))
                        }
                    </Container>
                    <Devider />
                    <Container title="Special Offers" style={LAY_OUT.flex_row}  >
                        <FlatList
                            horizontal
                            data={specialOffersEndPoint}
                            renderItem={({ item }) => (
                                <SpecialCards key={item.id} {...item} />
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </Container>
                    <Devider />
                    <Container title="Available Categories" seeMore style={styles.categoriesCon}  >
                        {
                            availableCategoriesEndPoint.map(categoryInfo => (
                                <AvailableCategoryCard key={categoryInfo.id} {...categoryInfo} />
                            ))
                        }
                    </Container>
                    <Devider />
                    <Container title="Most Viewed Products" seeMore style={styles.categoriesCon}  >
                        {
                            mostViewedProducts.map(productInfo => (
                                <ProductCard key={productInfo.id} {...productInfo} parentScreen="HomeStack" />
                            ))
                        }
                    </Container>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
    },
    container: {
        paddingBottom: LAY_OUT.padding,
        paddingHorizontal: LAY_OUT.padding
    },
    brandsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9.1
    },
    categoriesCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
})
