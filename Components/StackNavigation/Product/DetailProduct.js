import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Global from '../../../Global';

function currencyFormat(num) {
    var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return money + ' VND';
}

export default class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: {},
            isLoading: true
        }
    }

    addThisProductToCart() {
        const { product } = this.props;
        global.addProductToCart(product);
    }

    async addToCart() {
        this.setState({
            isLoading: true
        })

        if (Global.isLog) {
            await fetch(`${Global.url}/cart/product/${this.props.route.params.id_product}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Global.token}`
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 201 || responseJson.code == 200) {
                        Alert.alert(
                            "Thông báo",
                            "Bạn đã thêm vào giỏ hàng thành công",
                            [
                                { text: "Đồng ý" }
                            ]
                        );
                    }
                })
                .catch((err) => {
                    Alert.alert(
                        "Thông báo",
                        "Tài khoản hết hạn. Vui lòng đăng nhập lại!",
                        [
                            { text: "Đồng ý" }
                        ]
                    );

                    console.log(err)
                });
        } else {
            this.setState({
                isLoading: false
            })
            this.props.navigation.navigate('authen');
        }
        this.setState({
            isLoading: false
        })
    }

    render() {
        const {
            wrapper, cardStyle, header,
            backStyle,
            imageContainer, cartStyle, textBlack, textInformation, bigButton, buttonText,
            textSmoke, textHighlight, textMain, titleContainer, informationContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor, empty, buttonContainer
        } = styles;

        return (
            <View style={wrapper}>
                {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}
                <View style={cardStyle}>


                    <View style={imageContainer}>
                        <Image source={{ uri: `https://goodlaptop.herokuapp.com/image/information/${this.state.data.id_image}` }} style={productImageStyle} />
                    </View>

                    <View style={titleContainer}>
                        <Text style={textMain}>
                            <Text style={textBlack}>{this.state.data.name}</Text>
                        </Text>
                    </View>

                    <ScrollView >
                        <View style={informationContainer}>
                            <Text style={textInformation}>
                                <Text style={textHighlight} >Giá bán: </Text>
                                <Text style={textSmoke}> {currencyFormat(Number(this.state.data.price))} </Text>
                            </Text>
                            <Text style={textInformation}>
                                <Text style={textHighlight} >Hãng: </Text>
                                <Text style={textSmoke}>{this.state.data.brand}</Text>
                            </Text>
                            <Text style={textInformation}>
                                <Text style={textHighlight} >Thời gian bản hành: </Text>
                                <Text style={textSmoke}>{this.state.data.warranty} tháng</Text>
                            </Text>
                            <Text style={textInformation}>
                                <Text style={textHighlight} >Trạng thái: </Text>
                                {this.state.data.status > 0 ? (
                                    <Text style={textSmoke}>Còn hàng</Text>
                                ) : (
                                    <Text style={textSmoke}>Hết hàng</Text>
                                )}
                            </Text>
                            <Text style={textInformation}>
                                <Text style={textHighlight} >Thông tin chi tiết: </Text>
                            </Text>
                            <Text style={textInformation}>
                                <Text style={textSmoke}> {this.state.data.information}</Text>
                            </Text>


                        </View>

                        {this.state.data.status > 0 ? (
                            <View style={buttonContainer}>
                                <TouchableOpacity style={bigButton} onPress={this.addToCart.bind(this)}>
                                    <Text style={buttonText}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={empty} />
                    </ScrollView>
                </View>
            </View>
        );
    }

    componentDidMount() {
        fetch(`https://goodlaptop.herokuapp.com/product/information/${this.props.route.params.id_product}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.data[0],
                    isLoading: false
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const { width } = Dimensions.get('window');
const swiperWidth = (width) - 60;
const swiperHeight = (swiperWidth * 1.2) / 2;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    imageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingTop: 20
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10,
    },
    textInformation: {
        paddingLeft: 20
    },
    textBlack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fe0204'
    },
    textSmoke: {
        fontSize: 20,
        color: 'black'
    },
    textHighlight: {
        fontSize: 20,
        color: '#7D59C8',
        fontWeight: 'bold'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    informationContainer: {
        borderTopWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5,
        paddingTop: 10
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        width: 300,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
        backgroundColor: '#6fddaa'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#0b8a02',
        fontWeight: '400',
        fontSize: 20
    },
    empty: {
        padding: 50
    }
});