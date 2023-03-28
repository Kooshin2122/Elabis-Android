//
import React from 'react';
import { Devider, Header } from '../../../components';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ImageViewer } from './components';
import { useNavigation } from '@react-navigation/core';

const SettingScreen = ({ isUserLogin = true }) => {
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Header label="Settings" />
            <ScrollView style={styles.scrollCon}>
                <Devider height={23} />
                {/* Profile Container */}
                <View style={styles.profileContainer}>
                    <ImageViewer image={isUserLogin ? 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80' : null} />
                    <Devider />
                    {
                        isUserLogin ?
                            <View>
                                <Text style={styles.userName}>
                                    Abdirahman Abdirashid
                                </Text>
                                <Pressable onPress={() => navigate('EditProfile')}>
                                    <Text style={styles.editBtnTxt}>
                                        Edit Profile
                                    </Text>
                                </Pressable>
                            </View>
                            :
                            <Pressable style={styles.loginBtn}>
                                <Text style={styles.loginBtnTxt}>
                                    sign-in
                                </Text>
                            </Pressable>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    profileContainer: {
        paddingBottom: '5%',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    loginBtn: {
        paddingVertical: '3%',
        paddingHorizontal: '8%',
        borderRadius: '5',
        backgroundColor: COLORS.primary_color,
    },
    loginBtnTxt: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    userName: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.7,
    },
    editBtnTxt: {
        fontSize: 15,
        color: 'gray',
        marginTop: '3%',
        fontWeight: '500',
        letterSpacing: 0.7,
        textAlign: 'center',
    }
})
