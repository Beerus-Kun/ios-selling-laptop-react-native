import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerScene from './Components/DrawerNavigation/DrawerScene';
import DetailProduct from './Components/StackNavigation/Product/DetailProduct';
import SearchProduct from './Components/StackNavigation/Product/SearchProduct';
import ConfirmCart from './Components/StackNavigation/Cart/ConfirmCart';
import Global from './Global';
import DetailBill from './Components/StackNavigation/Bill/DetailBill';
import ForgotPassword from './Components/StackNavigation/Password/ForgotPassword';
import UpdatePassword from './Components/StackNavigation/Password/UpdatePassword';

const Stack = createNativeStackNavigator();

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='root'
            component={DrawerScene}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='detailProduct'
            component={DetailProduct}
            options={{ title: 'Sản phẩm' }}
          />

          <Stack.Screen
            name='searchProduct'
            component={SearchProduct}
            options={{ title: 'Sản phẩm' }}
          />

          <Stack.Screen
            name='confirmCart'
            component={ConfirmCart}
            options={{ title: 'Thanh toán' }}
          />

          <Stack.Screen
            name='detailBill'
            component={DetailBill}
            options={{ title: 'Chi tiết đơn hàng' }}
          />

          <Stack.Screen
            name='forgotPassword'
            component={ForgotPassword}
            options={{ title: 'Quên mật khẩu' }}
          />

          <Stack.Screen
            name='updatePassword'
            component={UpdatePassword}
            options={{ title: 'Thay đổi mật khẩu' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }

  componentDidMount() {
    Global.init()
  }
}

AppRegistry.registerComponent('buoi6-2', () => App);
