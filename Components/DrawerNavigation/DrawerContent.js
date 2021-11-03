import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Global from '../../Global';


// import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    const { state } = props
    const { routes, index } = state;
    const focusedRoute = routes[index];
    // nen xu ly bang bien toan cuc
    const isLogged = !(props.state.routes.length < 6)

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={
                                    require('../../image/avatar.png')
                                }
                                size={80}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{Global.name}</Title>
                                <Caption style={styles.caption}>{Global.email}</Caption>
                            </View>
                        </View>
                        {Global.isLog ? (
                            <View style={styles.row}>
                                <View style={styles.section}>
                                    {/* <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph> */}
                                    <Caption style={styles.caption}>Trạng thái</Caption>
                                </View>
                                <View style={styles.section}>
                                    {Global.status == '1' ? (
                                        <Paragraph style={[styles.paragraphActivate, styles.caption]}>Hoạt động</Paragraph>
                                    ) : (
                                        <Paragraph style={[styles.paragraphBlocked, styles.caption]}>Bị khóa</Paragraph>
                                    )}

                                    {/* <Caption style={styles.caption}>Followers</Caption> */}
                                </View>
                            </View>
                        ) : null}

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItemList {...props} />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {isLogged ? (
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <FontAwesome5
                                name="sign-in-alt"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Đăng xuất"
                        onPress={() => {
                            Alert.alert(
                                "Thông báo",
                                "Bạn có chắc chắc muốn đăng xuất không?",
                                [
                                    {
                                        text: "Không",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Có", onPress: () => {
                                            Global.signOut()
                                            Alert.alert(
                                                "Thông báo",
                                                "Bạn đã đăng xuất thành công",
                                                [
                                                    {
                                                        text: "Đồng ý",
                                                        onPress: ()=>{
                                                            props.navigation.navigate('home')
                                                        }
                                                    }
                                                ]
                                            );
                                        }
                                    }
                                ]
                            );

                        }}
                    />
                </Drawer.Section>
            ) : null}

        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: 'green'
    },
    paragraphActivate: {
        fontWeight: 'bold',
        marginRight: 3,
        color: 'green'
    },
    paragraphBlocked: {
        fontWeight: 'bold',
        marginRight: 3,
        color: 'red'
    },
    drawerSection: {
        marginTop: 30,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});