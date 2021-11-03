import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, Dimensions } from 'react-native';

import Global from '../../../Global';
const { width, height } = Dimensions.get('window');

export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPassword: '',
      txtRePassword: ''
    };
  }

  clickChangePassword() {
    if (this.state.txtPassword.length < 6) {
      Alert.alert(
        "Thông báo",
        "Mật khẩu không ít hơn 6 ký tự",
        [
          { text: "Đồng ý" }
        ]
      );
    } else if (this.state.txtPassword === this.state.txtRePassword) {
      fetch(`${Global.url}/account/change_password`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Global.token}`
        },
        body: JSON.stringify({
          'new_password': this.state.txtPassword
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(
            "Thông báo",
            "Đổi mật khẩu thành công",
            [
              { text: "Đồng ý" }
            ]
          );
          this.props.navigation.navigate('home');
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            "Thông báo",
            "Có lỗi xảy ra. Vui lòng đăng nhập lại",
            [
              { text: "Đồng ý" }
            ]
          );
        });
    } else {
      Alert.alert(
        "Thông báo",
        "Mật khẩu nhập lại không đúng",
        [
          { text: "Đồng ý" }
        ]
      );
    }
  }

  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, body, textTitle,
      signInContainer, signInTextStyle, textInput
    } = styles;
    const { txtPassword, txtRePassword } = this.state;
    return (
      <View>
        <View style={wrapper} >
          <View style={body}>
            <Text style={textTitle} > Mật khẩu mới: </Text>
            <TextInput
              style={textInput}
              placeholder="Nhập mật khẩu mới"
              autoCapitalize="none"
              value={txtPassword}
              onChangeText={text => this.setState({ ...this.state, txtPassword: text })}
              underlineColorAndroid="transparent"
              secureTextEntry
            />

            <Text style={textTitle} > Nhập lại mật khẩu: </Text>
            <TextInput
              style={textInput}
              placeholder="Nhập mật khẩu mới"
              autoCapitalize="none"
              value={txtRePassword}
              onChangeText={text => this.setState({ ...this.state, txtRePassword: text })}
              underlineColorAndroid="transparent"
              secureTextEntry
            />
            <TouchableOpacity style={signInContainer} onPress={this.clickChangePassword.bind(this)} >
              <Text style={signInTextStyle}>Đổi mật khẩu</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: { height: height * 0.8, width, backgroundColor: '#fff' },
  header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
  headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
  backIconStyle: { width: 30, height: 30 },
  body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1
  },
  signInTextStyle: {
    color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  signInStyle: {
    flex: 3,
    marginTop: 50
  },
  textTitle: {
    color: 'green', fontFamily: 'Avenir', fontWeight: '600', padding: 10, fontSize: 17, paddingLeft: 25,
  }
});