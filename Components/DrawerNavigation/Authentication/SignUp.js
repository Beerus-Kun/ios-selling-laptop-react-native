import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';

import Global from '../../../Global';

let resAPI;
const { height } = Dimensions.get('window');

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repassword: '',
            sex: '',
            phone: '',
            address: '',
            message: '',
            isLoading: false,
            isErr: false
        }
    }

    async onSignUp() {
        this.setState({
            isLoading: true
        })

        if (this.state.password != this.state.repassword) {
            this.setState({
                isErr: true,
                message: 'Mật khẩu nhập lại không đúng'
            })
        } else {
            let url = Global.url;
            await fetch(`${url}/account/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password,
                    'address': this.state.address,
                    'name': this.state.name,
                    'sex': this.state.sex,
                    'phone': this.state.phone
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resAPI = responseJson;
                })
                .catch((err) => {
                    console.log(err);
                });

        }

        if (resAPI.code == 201) {

            Global.email = this.state.email;
            Global.name = this.state.name;
            Global.address = this.state.address;
            Global.status = '1';
            Global.isLog = true;

            this.setState({
                name: '',
                email: '',
                password: '',
                repassword: '',
                sex: '',
                phone: '',
                address: '',
                message: '',
                isLoading: false,
                isErr: false
            })

            this.props.props.navigation.navigate('home');
        } else if (resAPI.code == 400) {
            this.setState({
                isErr: true
            })

            this.setState({
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        } else if (resAPI.code == 402 || resAPI.code == 421) {
            this.setState({
                isErr: true
            })

            this.setState({
                message: 'Email này đã được dùng'
            })
        }

        this.setState({
            isLoading: false
        })
    }


    render() {

        return (
            <View>
                {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}

                <ScrollView style={{height: height*0.8}} >
                    <Text style={styles.text}>Họ và tên</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Nguyễn Văn A"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <Text style={styles.text} >Số điện thoại</Text>
                    <TextInput
                        style={styles.inputStyle}
                        keyboardType='numeric'
                        placeholder="0123456789"
                        value={this.state.phone}
                        onChangeText={text => this.setState({ phone: text })}
                    />

                    <Text style={styles.text}>Địa chỉ</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="97 Man Thiện, phường Hiệp Phú, Quận Thủ Đức, thành phố Hồ Chí Minh"
                        value={this.state.address}
                        onChangeText={text => this.setState({ address: text })}
                    />

                    <Text style={styles.text} >Giới tính</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <RadioButton
                                color='black'
                                status={this.state.sex == 1 ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ sex: 1 })}
                            />
                            <Text style={styles.radioText} >Nam</Text>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <RadioButton
                                color='black'
                                status={this.state.sex == 0 ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ sex: 0 })}
                            />
                            <Text style={styles.radioText} >Nữ</Text>
                        </View>

                    </View>

                    <Text style={styles.text}>Địa chỉ email</Text>
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

                    <Text style={styles.text} >Nhập lại mật khẩu</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Mật khẩu có ít nhất 6 ký tự"
                        value={this.state.repassword}
                        onChangeText={text => this.setState({ repassword: text })}
                        secureTextEntry
                    />

                    {this.state.isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > {this.state.message} </Text></View>) : null}

                    <TouchableOpacity style={styles.bigButton} onPress={this.onSignUp.bind(this)}>
                        <Text style={styles.buttonText}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                    <View style={{ padding: 50 }} />
                </ScrollView>
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
    radioText: {
        fontFamily: 'Avenir',
        color: '#ce4e02',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
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


