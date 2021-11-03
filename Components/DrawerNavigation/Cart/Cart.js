import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
  Dimensions, StyleSheet, Image, RefreshControl, ActivityIndicator
} from 'react-native';
import Global from '../../../Global';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalPrice: 0,
      refreshing: false,
      isLoading: true
    }
  }

  incrQuantity(id) {
    this.setState({
      isLoading: true
    })

    fetch(`${Global.url}/cart/product/${id}?quantity=1`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.loadNewData(this);
        this.setState({
          isLoading: false
        })

      })
      .catch((err) => {
        console.log(err);
      });
  }
  decrQuantity(id, quantity) {
    this.setState({
      isLoading: true
    })

    fetch(`${Global.url}/cart/update/${id}/quantity`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      },
      body: JSON.stringify({
        'new_quantity': (quantity-1)
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 200){
          this.loadNewData(this);
        }
        this.setState({
          isLoading: false
        })

      })
      .catch((err) => {
        console.log(err);
      });
  }
  removeProduct(id) {
    this.setState({
      isLoading: true
    })

    fetch(`${Global.url}/cart/product/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 200){
          this.loadNewData(this);
        }
        this.setState({
          isLoading: false
        })

      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadNewData() {
    this.setState({
      refreshing: true
    })

    fetch(`${Global.url}/cart/account`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.data,
          totalPrice: responseJson.data.reduce((a, b) => a + b.current_price * b.quantity, 0),
          refreshing: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { main, checkoutButton, checkoutTitle, wrapper, txtQuantity, 
      productStyle, mainRight, productController, buttonContainer, buttonDeleteContainer,
      txtName, txtPrice, productImage, numberOfProduct,
      txtShowDetail, showDetailContainer } = styles;
    return (
      <View style={wrapper}>
        {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.loadNewData.bind(this)}
            />
          }

          data={this.state.data}
          keyExtractor={(item) => item.id_product.toString()}
          renderItem={({ item }) => (
            <View style={productStyle}>
              <Image source={{ uri: `${Global.url}/image/information/${item.id_image}` }} style={productImage} />
              <View style={[mainRight]}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text style={txtName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => this.removeProduct(item.id_cart)} >
                    <View
                      style={buttonDeleteContainer}
                      width={20}
                      height={20}
                    >
                      <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                    </View>

                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={txtPrice}>{Global.currencyFormat(item.current_price)}</Text>
                </View>
                <View style={productController}>
                  <View style={numberOfProduct}>
                    <TouchableOpacity style={buttonContainer} onPress={() => this.incrQuantity(item.id_product)}>
                      {/* <View
                        width={15}
                        height={15}
                      > */}
                        <Text style={{ fontSize: 20 }} >+</Text>
                      {/* </View> */}
                    </TouchableOpacity>

                    <Text style={txtQuantity} >{item.quantity}</Text>

                    <TouchableOpacity style={buttonContainer} onPress={() => this.decrQuantity(item.id_cart, item.quantity)}>
                      {/* <View
                        
                        width={15}
                        height={15}
                      > */}
                        <Text style={{ fontSize: 20 }} >-</Text>
                      {/* </View> */}
                    </TouchableOpacity>

                  </View>
                  <TouchableOpacity style={showDetailContainer} onPress={() => { this.props.navigation.navigate('detailProduct', { id_product: `${item.id_product}` })}} >
                    <Text style={txtShowDetail}>Xem sản phẩm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          )}
        />
        <TouchableOpacity style={checkoutButton} onPress={() => { this.props.navigation.navigate('confirmCart')}} >
          <Text style={checkoutTitle}>Mua hàng ({Global.currencyFormat(this.state.totalPrice)})</Text>
        </TouchableOpacity>
      </View>
    );
  }
  componentDidMount() {
    fetch(`${Global.url}/cart/account`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.data,
          totalPrice: responseJson.data.reduce((a, b) => a + b.current_price * b.quantity, 0),
          isLoading: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF'
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    width, backgroundColor: '#DFDFDF'
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  productStyle: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center'
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between'
  },
  productController: {
    flexDirection: 'row'
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#969696',
    width: 25,
    height: 25,
    // margin: 10
    // right: 15
  },
  buttonDeleteContainer: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#969696',
    width: 25,
    height: 25,
    // margin: 10
    right: 15
  },
  txtQuantity:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
