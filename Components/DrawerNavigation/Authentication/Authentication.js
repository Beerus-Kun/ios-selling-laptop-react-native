import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true
    }
  }

  signIn() {
    this.setState({ isSignIn: true });
  }

  signUp() {
    this.setState({ isSignIn: false });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isSignIn ? (<SignIn props = {this.props} />) : (<SignUp props = {this.props} />)}
        <View style={styles.controlStyle}>
          <TouchableOpacity style={styles.signInStyle} onPress={this.signIn.bind(this)}>
            <Text style={this.state.isSignIn ? styles.activeStyle : styles.inactiveStyle}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpStyle} onPress={this.signUp.bind(this)}>
            <Text style={!this.state.isSignIn ? styles.activeStyle : styles.inactiveStyle}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71dbae',
    padding: 20,
    justifyContent: 'space-between'
  },
  row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
  iconStyle: { width: 30, height: 30 },
  controlStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  inactiveStyle: {
    color: '#D7D7D7'
  },
  activeStyle: {
    color: '#3EBA77'
  },
  signInStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 1
  },
  signUpStyle: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  },

});