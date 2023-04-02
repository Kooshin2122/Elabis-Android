//
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { ImageViewer, LoginModal, SettingCards } from './components';
import { Devider, Header, LoadingIndicator, ModalContainer } from '../../../components';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const SettingScreen = ({ isUserLogin = true }) => {
    const { navigate } = useNavigation();
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [notifToggle, setNotifToggle] = useState(false)
    return (
        <SafeAreaView style={styles.container}>
            <Header label="Settings" />
            {/* <LoadingIndicator /> */}
            <ScrollView style={styles.scrollCon}>
                <Devider height={23} />
                {/* Profile Container */}
                <View style={styles.profileContainer}>
                    <ImageViewer image={isUserLogin && 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'} />
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
                <Devider />
                {/* Setting Cards Container */}
                <View style={styles.settingCardsContainer}>
                    <SettingCards leftIconName="bell" label="General Notification" switchValue={notifToggle} onSwitchValueChange={setNotifToggle} />
                    <SettingCards leftIconName="unlock" label="Privacy & Policy" rightIconName="right" clickHandler={() => navigate('PrivacyAndPolocy')} />
                    <SettingCards leftIconName="help-circle" label="Help-Center" rightIconName="right" clickHandler={() => navigate('HelpCenter')} />
                    {
                        isUserLogin &&
                        <SettingCards leftIconName="log-out" label="Log-Out" rightIconName="right" clickHandler={() => setIsLoginModalVisible(!isLoginModalVisible)} />
                    }
                </View>
            </ScrollView>
            {
                isLoginModalVisible
                &&
                <ModalContainer>
                    <LoginModal modalVisible={isLoginModalVisible} changeModalVisible={setIsLoginModalVisible} />
                </ModalContainer>
            }
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
        borderRadius: 5,
        backgroundColor: COLORS.primary_color,
    },
    loginBtnTxt: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    userName: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 0.7,
    },
    editBtnTxt: {
        fontSize: 18,
        color: 'gray',
        marginTop: '3%',
        fontWeight: '500',
        letterSpacing: 0.7,
        textAlign: 'center',
    },
    settingCardsContainer: {

    },
    // ----------
})
