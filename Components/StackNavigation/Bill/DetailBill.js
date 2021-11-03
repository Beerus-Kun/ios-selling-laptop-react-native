import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import Global from '../../../Global';

export default class DetailBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isLoading: true,
            billInfor: {},
            billItems: [],
            hasCancelButton: false
        }
    }

    getStatus(status) {
        switch (status) {
            case 0:
                return 'Đã hủy đơn'
            case 1:
                return 'Đang xử lý'
            case 2:
                return 'Đã nhận đơn'
            case 3:
                return 'Đã giao'
        }
    }

    loadNewData() {
        this.setState({
            refreshing: true
        })

        fetch(`${Global.url}/bill/information/${this.props.route.params.id_bill}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Global.token}`
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 210) {
                    this.setState({
                        billInfor: responseJson.bill,
                        billItems: responseJson.items,
                        refreshing: false
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

    clickCancel() {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc chắn muốn hủy đơn này?",
            [   
                { text: "không", style: 'destructive' },
                { text: "Đồng ý", onPress: () => {this.cancel()} }
                
            ]
        );
    }

    cancel() {
        fetch(`${Global.url}/bill/cancel/${this.props.route.params.id_bill}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Global.token}`
            },
            body: JSON.stringify({

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 200) {
                    Alert.alert(
                        "Thông báo",
                        "Bạn hủy đơn hàng thành công!",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                } else if (responseJson.code == 200) {
                    Alert.alert(
                        "Thông báo",
                        "Tài khoản của bạn đã bị khóa, không thể hủy hàng!",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                } else {
                    Alert.alert(
                        "Thông báo",
                        "Đơn đang được giao không thể hủy!",
                        [
                            { text: "Đồng ý" }
                        ]
                    );
                }

                this.setState({
                    hasCancelButton: false
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
            checkoutButton, checkoutTitle, wrapperProduct, inputStyle, textTitle,
            textBlack, textInformation, textSmoke, textHighlight, wrapperContent,
        } = styles;

        return (
            <View>
                {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}

                <ScrollView style={{ height: height * (this.state.hasCancelButton ? 0.83 : 1) }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.loadNewData.bind(this)}
                        />
                    }
                >
                    <View style={wrapperContent} >
                        <View>
                            <Text style={textBlack} > Đơn hàng</Text>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Mã số đơn: </Text>
                                <Text style={textSmoke} > {this.state.billInfor.id_bill} </Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Người nhận: </Text>
                                <Text style={textSmoke} > {this.state.billInfor.name} </Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Địa chỉ nhận: </Text>
                                <Text style={textSmoke} > {this.state.billInfor.address} </Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Trạng thái: </Text>
                                <Text style={textSmoke} > {this.getStatus(this.state.billInfor.status)} </Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Ngày đặt: </Text>
                                <Text style={textSmoke} > {this.state.billInfor.date} </Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Giờ đặt: </Text>
                                <Text style={textSmoke} > {this.state.billInfor.time} </Text>
                            </View>
                            <View flexDirection='row' >
                                <Text style={textHighlight} >Giá tiền: </Text>
                                <Text style={textSmoke} > {Global.currencyFormat(this.state.billInfor.total_money)} </Text>
                            </View>
                        </View>
                    </View>

                    <View style={wrapperContent} >
                        <Text style={textBlack}> Sản phẩm </Text>

                        {this.state.billItems.map(item => (
                            <View style={wrapperProduct} key={item.id_product} >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                    <Image source={{ uri: `https://goodlaptop.herokuapp.com/image/information/${item.id_image}` }}
                                        style={{ width: 130, height: 90 }}
                                    />
                                    <View>
                                        <Text style={textTitle} >Tên sản phẩm: </Text>
                                        <Text style={textInformation} > {item.name} </Text>

                                        <Text style={textTitle} >Hãng sản xuất: </Text>
                                        <Text style={textInformation} >{item.brand_name}</Text>

                                        <Text style={textTitle} >Số lượng: </Text>
                                        <Text style={textInformation} >{item.quantity} sản phẩm</Text>

                                        <Text style={textTitle} >Thời gian bản hành: </Text>
                                        <Text style={textInformation} >{item.warranty} tháng</Text>

                                        <Text style={textTitle} >Tổng giá trị sản phẩm: </Text>
                                        <Text style={textInformation} >{Global.currencyFormat(item.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{ height: height * 0.2 }} >

                    </View>
                </ScrollView>

                {this.state.hasCancelButton ? (
                    <TouchableOpacity style={checkoutButton} onPress={() => this.clickCancel()} >
                        <Text style={checkoutTitle}> Hủy đơn hàng </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    }

    componentDidMount() {
        fetch(`${Global.url}/bill/information/${this.props.route.params.id_bill}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Global.token}`
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 210) {
                    this.setState({
                        billInfor: responseJson.bill,
                        billItems: responseJson.items,
                        isLoading: false
                    })
                    if(this.state.billInfor.status == '1'){
                        this.setState({
                            hasCancelButton: true
                        })
                    }
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
        color: 'black',
        // textAlign: 'justify',
        maxWidth: width * 0.62
    },
    textHighlight: {
        fontSize: 20,
        color: '#cd6001',
        fontWeight: 'bold',
        width: width * 0.3
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
        backgroundColor: '#ff7802',
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