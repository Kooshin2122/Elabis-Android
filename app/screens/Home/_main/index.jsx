//
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { changeActiveTab } from '../../../ReduxStore/ProductScreenSlice';
import { HomeHeader, SpecialCards, AvailableCategoryCard, HomeSkeleton } from './components';
import { Devider, MyStatusBar, Container, PopularBrandsCard, ProductCard, LoadingIndicator, LoadingModal } from '../../../components';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, Button, FlatList, RefreshControl } from 'react-native';
import { availableCategoriesEndPoint, mostViewedProducts, popularBrandsEndPoint, specialOffersEndPoint } from './services';
import { fetchGetData } from '../../../API';
//
const HomeScreen = () => {
    //
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [populaBrandsData, setPopulaBrandsData] = useState([]);
    //
    const getHomeDataAsync = async () => {
        const response = await fetchGetData("buyer/user/dashboard", setLoading);
        setProductsData(response.products);
        setCategoriesData(response.categories);
        setPopulaBrandsData(response.popular_brands);
    };
    //
    useEffect(() => {
        getHomeDataAsync();
    }, [])
    //
    const onPressPopularBrandsSeeMore = () => {
        navigate('ProductStack')
        dispatch(changeActiveTab(false))
    }
    const onPressAvailableProductsSeeMore = () => {
        navigate('ProductStack')
        dispatch(changeActiveTab(true))
    }
    const onPressPopularProductsSeeMore = () => {
        navigate('ProductStack', {
            screen: "ProductsScreen"
        })
    }
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <MyStatusBar />
            {loading && <LoadingModal />}
            <HomeHeader />
            <ScrollView
                refreshControl={<RefreshControl onRefresh={getHomeDataAsync} />}
                style={styles.scrollCon} showsVerticalScrollIndicator={false}
            >
                <Devider />
                <View style={styles.container}>
                    <Container title="Popular Brands" seeMore style={styles.brandsCon} onPressSeeMore={onPressPopularBrandsSeeMore}  >
                        {
                            populaBrandsData.map(brandInfo => (
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
                    <Container title="Available Categories" seeMore style={styles.categoriesCon} onPressSeeMore={onPressAvailableProductsSeeMore}  >
                        {
                            categoriesData.map(categoryInfo => (
                                <AvailableCategoryCard key={categoryInfo.id} {...categoryInfo} />
                            ))
                        }
                    </Container>
                    <Devider />
                    <Container title="Most Viewed Products" seeMore style={styles.categoriesCon} onPressSeeMore={onPressPopularProductsSeeMore}  >
                        {
                            productsData.map((productInfo, index) => (
                                <ProductCard key={index} {...productInfo} parentScreen="HomeStack" />
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
