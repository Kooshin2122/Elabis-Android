//
import { fetchGetData } from '../../../API';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { ListEmptyComponent, LoadingModal, SubHeader } from '../../../components';
import { Button, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ShopsCard } from './components';
//
const ShopsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [shopsData, setShopsData] = useState([]);
    //
    const getShopsDataAsync = async () => {
        // console.log("Shops");
        const response = await fetchGetData("buyer/shop/view", setLoading);
        console.log(response.data);
        setShopsData(response.data);
        // console.log("response----------->", response.data);
    };
    //
    useEffect(() => {
        getShopsDataAsync();
    }, [])
    //
    return (
        <SafeAreaView style={styles.container}>
            {/* <SubHeader title="SHOPS" /> */}
            {loading && <LoadingModal />}
            <FlatList
                data={shopsData}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => <ShopsCard {...item} />}
                ListEmptyComponent={() => <ListEmptyComponent title="Sorry" />}
            />

        </SafeAreaView>
    )
}
//
export default ShopsScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    flatListContainer: {
        rowGap: 10,
        padding: "4%",
        backgroundColor: "#fefefe",
    }
});
//