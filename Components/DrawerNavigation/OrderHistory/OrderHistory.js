import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, FlatList, ActivityIndicator, RefreshControl
} from 'react-native';

import Global from '../../../Global';

const { width } = Dimensions.get('window');

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      page: 2,
      refreshing: false
    };
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
      refreshing: true,
      page: 2
    })

    fetch(`${Global.url}/bill/account`, {
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
          refreshing: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _onEndReach() {
    fetch(`${Global.url}/bill/account?page=${this.state.page}`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Global.token}`
      }
    })
      .then((res) => res.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson.data) {
          this.setState({
            data: this.state.data.concat(responseJson.data),
            page: this.state.page + 1
          });
        }
      })
      .catch()
  }

  componentDidMount() {
    fetch(`${Global.url}/bill/account`, {
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
          isLoading: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { wrapper, body, orderRow } = styles;
    return (
      <View style={wrapper}>
        {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}
        <View style={body}>

          <FlatList

            onEndReached={this._onEndReach.bind(this)}

            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadNewData.bind(this)}
              />
            }

            keyExtractor={(item) => item.id_bill.toString()}
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity style={orderRow} onPress={() => { this.props.navigation.navigate('detailBill', { id_bill: `${item.id_bill}` })}} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã đơn hàng:</Text>
                  <Text style={{ color: '#2ABB9C' }}>{item.id_bill}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày mua hàng:</Text>
                  <Text style={{ color: '#C21C70' }}> {item.date} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Giờ mua hàng:</Text>
                  <Text style={{ color: '#2ABB9C' }}> {item.time} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Địa chỉ giao hàng:</Text>
                  <Text style={{ color: '#C21C70', maxWidth: width * 0.5, textAlign: 'right' }}> {item.address} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Trạng thái đơn hàng:</Text>
                  <Text style={{ color: '#2ABB9C' }}> {this.getStatus(item.status)} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền:</Text>
                  <Text style={{ color: '#C21C70', fontWeight: 'bold' }}> {Global.currencyFormat(item.total_money)} </Text>
                </View>

              </TouchableOpacity>

            )}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 10, backgroundColor: '#F6F6F6' },
  orderRow: {
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around'
  }
});