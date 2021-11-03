import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import Global from '../../../Global';

function currencyFormat(num) {
    var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return money + ' VND';
}

export default class ConfirmCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [],
            isLoading: false,
            address: '',
            name: '',
            email: '',
            totalPrice: 0,
            isLoading: true
        }
    }

    async clickBuy() {
        if (this.state.address.trim() == '') {
            Alert.alert(
                "Thông báo",
                "Vui lòng nhập địa chỉ giao hàng",
                [
                  { text: "Đồng ý"}
                ]
              );
        } else {
            await fetch(`${Global.url}/bill/bought`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Global.token}`
                },
    
                body: JSON.stringify({
                    'address': `${this.state.address}`
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 417) {
                        Alert.alert(
                            "Thông báo",
                            "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm thông tin chi tiết",
                            [
                                { text: "Đồng ý" }
                            ]
                        );
                    } else if (responseJson.code == 418) {
                        Alert.alert(
                            "Thông báo",
                            "Bạn không có sản phẩm nào trong giỏ hàng",
                            [
                                { text: "Đồng ý" }
                            ]
                        );
                        this.props.navigation.goBack();
                    } else if (responseJson.code == 419) {
                        Alert.alert(
                            "Thông báo",
                            `${responseJson.product_name} chỉ còn ${responseJson.amount} sản phẩm. 
                            \nVui lòng giảm số lượng của sản phẩm này`,
                            [
                                { text: "Đồng ý" }
                            ]
                        );
    
                        this.props.navigation.goBack();
                    } else if (responseJson.code == 200) {
                        Alert.alert(
                            "Thông báo",
                            `Thao tác mua thành công. \nVui lòng vô lịch sử mua hàng để xem thông tin`,
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

        
    }

    render() {
        const {
            checkoutButton, checkoutTitle, wrapperProduct, inputStyle, textTitle,
            textBlack, textInformation, textSmoke, textHighlight, wrapperContent,
        } = styles;

        return (
            <View>
                {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}
                <ScrollView style={{ height: height * 0.83 }} >
                    <View style={wrapperContent} >
                        <View>
                            <Text style={textBlack} >Thông tin nhận hàng</Text>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Họ và tên: </Text>
                                <Text style={textSmoke} >{this.state.name}</Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Email: </Text>
                                <Text style={textSmoke} >{this.state.email}</Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Địa chỉ nhận: </Text>
                                <TextInput
                                    style={inputStyle}
                                    value={this.state.address}
                                    onChangeText={text => this.setState({ address: text })}
                                />

                            </View>
                        </View>
                    </View>

                    <View style={wrapperContent} >
                        <Text style={textBlack}> Chi tiết sản phẩm </Text>

                        {this.state.data.map(item => (
                            <View style={wrapperProduct} key={item.id_product} >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                    <Image source={{ uri: `https://goodlaptop.herokuapp.com/image/information/${item.id_image}` }}
                                        style={{ width: 130, height: 90 }}
                                    />
                                    <View>
                                        <Text style={textTitle} >Tên sản phẩm: </Text>
                                        <Text style={textInformation} > {item.name} </Text>

                                        <Text style={textTitle} >Thời gian bản hành: </Text>
                                        <Text style={textInformation} >{item.warranty} tháng</Text>


                                        <Text style={textTitle} >Số lượng: </Text>
                                        <Text style={textInformation} >{item.quantity} sản phẩm</Text>


                                        <Text style={textTitle} >Giá mỗi sản phẩm: </Text>
                                        <Text style={textInformation} >{currencyFormat(item.current_price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={wrapperContent} >
                        <Text style={textBlack} >Tổng giá trị đơn hàng</Text>
                        <Text style={textTitle} > {currencyFormat(this.state.totalPrice)} </Text>
                    </View>
                </ScrollView>

                <TouchableOpacity style={checkoutButton} onPress={() => this.clickBuy()} >
                    <Text style={checkoutTitle}> Thanh toán </Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {

        this.setState({
            name: Global.name,
            email: Global.email
        })

        fetch(`${Global.url}/bill/checked`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Global.token}`
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                if (responseJson.code == 417) {
                    Alert.alert(
                        "Thông báo",
                        "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm thông tin chi tiết",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                } else if (responseJson.code == 418) {
                    Alert.alert(
                        "Thông báo",
                        "Bạn không có sản phẩm nào trong giỏ hàng",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                    this.props.navigation.goBack();
                } else if (responseJson.code == 419) {
                    Alert.alert(
                        "Thông báo",
                        `${responseJson.product_name} chỉ còn ${responseJson.amount} sản phẩm. 
                        \nVui lòng giảm số lượng của sản phẩm này`,
                        [
                            { text: "Đồng ý" }
                        ]
                    );

                    this.props.navigation.goBack();
                } else if (responseJson.code == 207) {
                    // console.log(responseJson);
                    this.setState({
                        data: responseJson.data,
                        address: responseJson.address,
                        totalPrice: responseJson.totalPrice,
                        isLoading: false
                    })
                }
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

const { width, height } = Dimensions.get('window');
const swiperWidth = (width) - 60;
const swiperHeight = (swiperWidth * 1.2) / 2;

const styles = StyleSheet.create({
    textBlack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fe0204',
        margin: 10
    },
    textSmoke: {
        fontSize: 20,
        color: 'black'
    },
    textHighlight: {
        fontSize: 20,
        color: '#cd6001',
        fontWeight: 'bold'
    },
    wrapperContent: {
        // height: height * 0.33,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        paddingTop: 0
    },
    wrapperProduct: {
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 5,
        padding: 5,
        borderWidth: 0.3
    },
    inputStyle: {
        borderWidth: 0.2,
        borderRadius: 3,
        paddingRight: 10,
        paddingLeft: 5,
        width: width * 0.6
    },
    textTitle: {
        paddingLeft: 5,
        fontWeight: 'bold',
        color: '#cc0001',
        marginTop: 7
    },
    textInformation: {
        paddingLeft: 5,
        width: 200
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
});