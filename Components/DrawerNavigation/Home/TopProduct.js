import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';

export default class TopProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>Top Product</Text>
                </View>

                <View style={styles.body}>
                    {this.state.data.map(item => (
                        <View key={item.id_product} >
                            <TouchableOpacity onPress={() => { this.props.props.navigation.navigate('detailProduct', { id_product: `${item.id_product}` }) }} >
                                <View style={styles.productContainer} >
                                    <Image source={{ uri: `https://goodlaptop.herokuapp.com/image/information/${item.id_image}` }} style={styles.productImage} />
                                    <Text style={styles.produceName}> {item.name} </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
    componentDidMount() {
        fetch("https://goodlaptop.herokuapp.com/product/all?num_rows=4")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.data
                })
                // console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err);
            });


    }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = produtWidth;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#D3D3CF',
        fontSize: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    productContainer: {
        width: produtWidth,
        borderWidth: 0,
        elevation: 1.3,
        borderBottomEndRadius: 20,
        borderRightWidth: 0.3,
        borderBottomLeftRadius: 10,
        marginHorizontal: 10,
        marginTop: 24

    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#f62e2a',
        fontWeight: '500'
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#662F90'
    }
});

