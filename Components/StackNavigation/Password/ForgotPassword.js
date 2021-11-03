import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';

import Global from '../../../Global';

const { width, height } = Dimensions.get('window');
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSendEmail: false,
            txtEmail: '',
            txtCode: '',
            isEditEmail: true,
            refreshing: false,
            idAccount: ''
        };
    }

    clickSendCode() {
        if (this.state.txtEmail) {
            fetch(`${Global.url}/account/forgot-password`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': this.state.txtEmail
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson)
                    if (responseJson.code == '204') {
                        Alert.alert(
                            "Thông báo",
                            "Đã gửi mã vào email của bạn.\nVui lòng kiểm tra email và nhập mật mã",
                            [
                                { text: "Đồng ý" }
                            ]
                        );

                        this.setState({
                            isSendEmail: true,
                            isEditEmail: false,
                            idAccount: responseJson.id_account
                        })
                    } else if (responseJson.code == '404') {
                        Alert.alert(
                            "Thông báo",
                            "Email không đúng. \nVui lòng kiểm tra lại email",
                            [
                                { text: "Đồng ý" }
                            ]
                        );

                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            Alert.alert(
                "Thông báo",
                "Bạn chưa nhập email.",
                [
                    { text: "Đồng ý" }
                ]
            );
        }
    }

    async clickConfirmCode() {
        fetch(`${Global.url}/account/confirm/${this.state.idAccount}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'code': this.state.txtCode
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == '203') {
                    Global.setToken(responseJson.accessToken);
                    Global.setIsSignin('true');

                    fetch(`${Global.url}/account/information`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${responseJson.accessToken}`
                        }
                    })
                        .then((response) => response.json())
                        .then((resJson) => {
                            Global.email = resJson.data.email;
                            Global.name = resJson.data.name;
                            Global.address = resJson.data.address;
                            Global.status = resJson.data.status;
                            Global.isLog = true;
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    Alert.alert(
                        "Thông báo",
                        "Khôi phục tài khoản thành công. \nVui lòng đổi lại mật khẩu",
                        [
                            { text: "Đồng ý" }
                        ]
                    );

                    this.props.navigation.navigate('updatePassword');

                } else if (responseJson.code == '405') {
                    Alert.alert(
                        "Thông báo",
                        "Mã đã hết hạn.",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                } else if (responseJson.code == '426') {
                    Alert.alert(
                        "Thông báo",
                        "Mật mã không đúng.",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    refresh() {
        this.setState({
            isSendEmail: false,
            txtEmail: '',
            txtCode: '',
            isEditEmail: true,
            refreshing: false
        })
    }
    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body, textTitle,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { txtEmail, txtCode } = this.state;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.refresh.bind(this)}
                    />
                }
            >
                <View style={wrapper} >
                    <View style={body}>
                        <Text style={textTitle} > Email: </Text>
                        <TextInput
                            style={textInput}
                            placeholder="Nhập địa chỉ email"
                            autoCapitalize="none"
                            value={txtEmail}
                            onChangeText={text => this.setState({ ...this.state, txtEmail: text })}
                            underlineColorAndroid="transparent"
                            editable={this.state.isEditEmail}
                        />

                        {this.state.isSendEmail ? (
                            <View>
                                <Text style={textTitle} > Nhập mã: </Text>
                                <TextInput
                                    style={textInput}
                                    placeholder="Nhập mật mã, trong email"
                                    autoCapitalize="none"
                                    value={txtCode}
                                    keyboardType='numeric'
                                    onChangeText={text => this.setState({ ...this.state, txtCode: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        ) : null}

                        {this.state.isSendEmail ? (
                            <TouchableOpacity style={signInContainer} onPress={this.clickConfirmCode.bind(this)} >
                                <Text style={signInTextStyle}>Xác thực mã</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={signInContainer} onPress={this.clickSendCode.bind(this)} >
                                <Text style={signInTextStyle}>Gửi mã</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>

            </ScrollView>
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