import React, { Component } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Authentication from './Authentication/Authentication';
import ChangeInfor from './ChangeInfor/ChangeInfor';
import Home from './Home/Home';
import OrderHistory from './OrderHistory/OrderHistory';
import { DrawerContent } from './DrawerContent';
import Product from './Product/Product';
import Feedback from './Feedback/Feedback';
import Cart from './Cart/Cart';

import Global from '../../Global';

const Drawer = createDrawerNavigator();

export default class DrawerScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <Drawer.Navigator initialRouteName='home' activeColor="green"
                drawerContent={props => <DrawerContent {...props} />}
                screenOptions={({ route }) => ({
                    drawerActiveTintColor: 'green',
                    drawerIcon: ({ focused, size, color }) => {
                        let icon_name;
                        if (route.name == 'home') {
                            icon_name = 'home';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        } else if (route.name == 'product') {
                            icon_name = 'laptop';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        } else if (route.name == 'infor') {
                            icon_name = 'user';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        } else if (route.name == 'history') {
                            icon_name = 'address-card';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        } else if (route.name == 'feedback') {
                            icon_name = 'comment-dots';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        } else if (route.name == 'cart') {
                            icon_name = 'shopping-cart';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        } else if (route.name == 'authen') {
                            icon_name = 'user-circle';
                            size = focused ? 25 : 20;
                            color = focused ? 'green' : 'black';
                        }

                        return (
                            <FontAwesome5
                                name={icon_name}
                                size={size}
                                color={color}
                            />
                        )
                    }
                })}
            >
                <Drawer.Screen
                    name='home' component={Home} options={{ title: "Good Laptop" }}
                />
                <Drawer.Screen
                    name='product' component={Product} options={{ title: "Sản phẩm", }}
                />

                {Global.isLog ? (
                    <>
                        <Drawer.Screen
                            name='infor' component={ChangeInfor} options={{ title: "Thông tin cá nhân" }}
                        />
                        <Drawer.Screen
                            name='cart' component={Cart} options={{ title: "Giỏ hàng của bạn" }}
                        />
                        <Drawer.Screen
                            name='history' component={OrderHistory} options={{ title: "Lịch sử mua hàng" }}
                        />
                        <Drawer.Screen
                            name='feedback' component={Feedback} options={{ title: "Phản hồi" }}
                        />
                    </>
                ) : (
                    <Drawer.Screen
                        name='authen' component={Authentication} options={{ title: "Đăng nhập" }}
                    />
                )}

            </Drawer.Navigator>
        )
    }

}
