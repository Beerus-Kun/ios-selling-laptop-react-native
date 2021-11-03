import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert } from 'react-native';

import Global from '../../../Global';

export default class ChangeInfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      txtName: '',
      txtAddress: '',
      txtPhone: '',
      sex: 0,
      isEdit: false,
      isChange: false,
      name: '',
      address: '',
      phone: ''
    };
  }

  clickChange() {
    this.setState({
      isEdit: true,
      isChange: true
    })
  }

  clickChangePassword() {
    console.log('doi mat khau')
  }

  clickUpdate() {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn thay đổi không?",
      [
        {
          text: "Không",
          onPress: () => {
            this.setState({
              isEdit: false,
              isChange: false,
              txtPhone: this.state.phone,
              txtName: this.state.name,
              txtAddress: this.state.address
            })
          },
          style: "cancel"
        },
        {
          text: "Đồng ý", onPress: () => {
            fetch(`${Global.url}/account/update/information`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Global.token}`
              },
              body: JSON.stringify({
                'name': this.state.txtName,
                'phone': this.state.txtPhone,
                'address': this.state.txtAddress,
                'sex': this.state.sex
              })
            })
              .then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  isEdit: false,
                  isChange: false,
                  name: this.state.txtName,
                  address: this.state.txtAddress,
                  phone: this.state.txtPhone
                })
              })
              .catch((err) => {
                Alert.alert(
                  "Thông báo",
                  "Có lỗi đang xảy ra. Vui lòng đăng nhập lại",
                  [
                    { text: "Đồng ý" }
                  ]
                );
                console.log(err);
              });


          }
        }
      ]
    );

  }

  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, body, textTitle,
      signInContainer, signInTextStyle, textInput
    } = styles;
    const { txtName, txtAddress, txtPhone } = this.state;
    return (
      <View style={wrapper}>
        <View style={body}>
          <Text style={textTitle} > Họ và tên: </Text>
          <TextInput
            style={textInput}
            placeholder="Enter your name"
            autoCapitalize="none"
            value={txtName}
            onChangeText={text => this.setState({ ...this.state, txtName: text })}
            underlineColorAndroid="transparent"
            editable={this.state.isEdit}
          />
          <Text style={textTitle} > Địa chỉ: </Text>
          <TextInput
            style={textInput}
            placeholder="Enter your address"
            autoCapitalize="none"
            value={txtAddress}
            onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
            underlineColorAndroid="transparent"
            editable={this.state.isEdit}
          />
          <Text style={textTitle} > Số điện thoại: </Text>
          <TextInput
            style={textInput}
            placeholder="Enter your phone number"
            autoCapitalize="none"
            keyboardType='numeric'
            value={txtPhone}
            onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
            underlineColorAndroid="transparent"
            editable={this.state.isEdit}
          />
          {this.state.isChange ? (
            <TouchableOpacity style={signInContainer} onPress={this.clickUpdate.bind(this)} >
              <Text style={signInTextStyle}>Cập nhật thông tin</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={signInContainer} onPress={this.clickChange.bind(this)} >
              <Text style={signInTextStyle}>Thay đổi thông tin</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{ top: 10 }} onPress={()=>{this.props.navigation.navigate('updatePassword')} }>
            <View>
              <Text style={styles.changePassword}>Đổi mật khẩu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    fetch(`${Global.url}/account/information`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          txtAddress: responseJson.data.address,
          txtName: responseJson.data.name,
          txtPhone: responseJson.data.phone,
          address: responseJson.data.address,
          name: responseJson.data.name,
          phone: responseJson.data.phone,
          sex: responseJson.data.sex
        })
      })
      .catch((err) => {
        Alert.alert(
          "Thông báo",
          "Có lỗi đang xảy ra. Vui lòng đăng nhập lại",
          [
            { text: "Đồng ý" }
          ]
        );
        console.log(err);
      });
  }

}


const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
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
  },
  changePassword: {
    fontStyle: 'italic',
    textAlign: 'right',
    color: '#1f51b8',
    right: 5,
    textDecorationLine: 'underline',
    padding: 20
  },
});