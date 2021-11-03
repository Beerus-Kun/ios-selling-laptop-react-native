import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Global from '../../../Global';


let resAPI;

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isErr: false,
            message: '',
            isLoading: false
        }
    }

    async onSignIn() {

        this.setState({
            isLoading: true
        })

        await fetch(`${Global.url}/account/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resAPI = responseJson;
            })
            .catch((err) => {
                console.log(err);
            });

        if (resAPI.code == 203) {
            await Global.setToken(resAPI.accessToken);
            await Global.setIsSignin('true');

            await fetch(`${Global.url}/account/information`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resAPI.accessToken}`
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resAPI = responseJson;
                })
                .catch((err) => {
                    console.log(err);
                });

            Global.email = resAPI.data.email;
            Global.name = resAPI.data.name;
            Global.address = resAPI.data.address;
            Global.status = resAPI.data.status;
            Global.isLog = true;

            this.setState({
                isErr: false,
                message: '',
                email: '',
                password: ''
            })

            this.props.props.navigation.navigate('home');

        } else if (resAPI.code == 400) {
            this.setState({
                isErr: true,
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        } else if (resAPI.code == 401) {
            this.setState({
                isErr: true,
                message: 'Email hoặc mật khẩu sai'
            })
        }

        this.setState({
            isLoading: false,
            email: '',
            password: ''
        })
    }

    clickForgotPassword(){
        // console.log(this.props);
        // console.log(this.state);
        // console.log('123')
        this.props.props.navigation.navigate('forgotPassword')
    }

    render() {

        return (
            <View>
                {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="abc@gmail.com"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <Text style={styles.text} >Mật khẩu</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />

                {this.state.isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > {this.state.message} </Text></View>) : null}

                <TouchableOpacity style={styles.bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ top: 10 }} onPress={ this.clickForgotPassword.bind(this) }>
                    <View>
                        <Text style={styles.forgot}>Quên mật khẩu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    },
    forgot: {
        fontStyle: 'italic',
        textAlign: 'right',
        color: '#1f51b8',
        right: 5,
        textDecorationLine: 'underline',
        padding: 20
    },
    text: {
        fontFamily: 'Avenir',
        color: '#ce4e02',
        fontWeight: '400',
        fontSize: 20,
        padding: 10,
        // top: 5,
        paddingTop: 5
    },
    mess: {
        color: 'red',
        padding: 10,
    },
    messContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
