import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, Dimensions } from 'react-native';

import Global from '../../../Global';

const { height, width } = Dimensions.get('window');

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      txtSubject: '',
      txtContent: ''
    };
  }

  clickSend() {
    fetch(`${Global.url}/feedback`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      },
      body: JSON.stringify({
        'subject':this.state.txtSubject,
        'content':this.state.txtContent
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(
          "Thông báo",
          "Cảm ơn bạn đã đóng góp ý kiến!",
          [
            { text: "Đồng ý" }
          ]
        );

        this.setState({
          txtSubject: '',
          txtContent: ''
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

  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, body, textTitle,
      signInContainer, signInTextStyle, textInput, textContent
    } = styles;

    const { txtContent, txtSubject } = this.state;
    return (
      <View style={wrapper}>
        <View style={body}>
          <Text style={textTitle} > Tiêu đề: </Text>
          <TextInput
            style={textInput}
            placeholder="Nhập chủ để"
            autoCapitalize="none"
            value={txtSubject}
            onChangeText={text => this.setState({ ...this.state, txtSubject: text })}
            underlineColorAndroid="transparent"
            selectTextOnFocus={true}
          />
          <Text style={textTitle} > Nội dung: </Text>
          <TextInput
            style={textContent}
            placeholder="Nhập nội dung bạn muốn đóng góp"
            autoCapitalize="none"
            value={txtContent}
            multiline={true}
            onChangeText={text => this.setState({ ...this.state, txtContent: text })}
            underlineColorAndroid="transparent"
            selectTextOnFocus={true}
          />

          <TouchableOpacity style={signInContainer} onPress={this.clickSend.bind(this)} >
            <Text style={signInTextStyle}>Gửi phản hồi</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
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
  textContent: {
    height: height * 0.4,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1
  }
});