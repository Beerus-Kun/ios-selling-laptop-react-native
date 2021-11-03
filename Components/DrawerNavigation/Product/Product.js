import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity, Dimensions, StyleSheet, Switch, ActivityIndicator } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker'
import Global from '../../../Global';


function currencyFormat(num) {
  var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return money + ' VND';
}
const { width, height } = Dimensions.get('window');

var priceArr = [{ label: 'Không', value: 'is_sorted_price=0' }, { label: 'Tăng (giá)', value: 'is_sorted_price=1&sorted_price=1' }, { label: 'Giảm (giá)', value: 'is_sorted_price=1&sorted_price=0' }];
var lowPrice = [{ label: '0', value: 'lowest_price=0' }, { label: '15,000,000 VND', value: 'lowest_price=15000000' }, { label: '35,000,000 VND', value: 'lowest_price=35000000' }];
var highPrice = [{ label: '20,000,000 VND', value: 'highest_price=20000000' }, { label: '40,000,000 VND', value: 'highest_price=40000000' }, { label: '60,000,000 VND', value: 'highest_price=60000000' }, { label: 'MAX', value: 'highest_price=999999999' }];

var defaultPrice = 'is_sorted_price=0';
var defaultBrand = 'is_brand=0';
var defaultLowPrice = 'lowest_price=0';
var defaultHighPrice = 'highest_price=999999999'
var defaulSearch = 'is_search_name=0'

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      page: 2,
      isShowOption: true,
      isLoading: true,
      brands: [{ label: 'Không', value: defaultBrand }],
      brandQr: defaultBrand,
      priceQr: defaultPrice,
      openBrand: false,
      valueBrand: null,
      openPrice: false,
      valuePrice: null,
      openHighPrice: false,
      valueHighPrice: null,
      openLowPrice: false,
      valueLowPrice: null,
      txtSearch: '',
      searchQr: defaulSearch
    }
  }

  clickSwitch() {
    this.setState({
      isShowOption: !this.state.isShowOption
    })
  }

  setOpenBrand(openBrand) {
    this.setState({
      openBrand,
      openPrice: false,
      openHighPrice: false,
      openLowPrice: false
    })
  }

  setValueBrand(callback) {
    this.setState(state => ({
      valueBrand: callback(state.value)
    }))
  }

  setOpenPrice(openPrice) {
    this.setState({
      openPrice,
      openBrand: false,
      // openPrice: false,
      openHighPrice: false,
      openLowPrice: false
    })
  }

  setValuePrice(callback) {
    this.setState(state => ({
      valuePrice: callback(state.value)
    }))
  }

  setOpenHighPrice(openHighPrice) {
    this.setState({
      openHighPrice,
      openBrand: false,
      openPrice: false,
      // openHighPrice: false,
      openLowPrice: false
    })
  }

  setValueHighPrice(callback) {
    this.setState(state => ({
      valueHighPrice: callback(state.value)
    }))
  }

  setOpenLowPrice(openLowPrice) {
    this.setState({
      openLowPrice,
      openBrand: false,
      openPrice: false,
      openHighPrice: false,
      // openLowPrice: false
    })
  }

  setValueLowPrice(callback) {
    this.setState(state => ({
      valueLowPrice: callback(state.value)
    }))
  }

  clickFilter() {
    this.setState({
      refreshing: true,
      page: 2,
      brandQr: this.state.valueBrand ? this.state.valueBrand : defaultBrand,
      priceQr: `${this.state.valuePrice ? this.state.valuePrice : defaultPrice}&${this.state.valueHighPrice ? this.state.valueHighPrice : defaultHighPrice}&${this.state.valueLowPrice ? this.state.valueLowPrice : defaultLowPrice}`,
      openBrand: false,
      openPrice: false,
      openHighPrice: false,
      openLowPrice: false,
      searchQr: defaulSearch,
      txtSearch: ''
    })

    fetch(`${Global.url}/product/all?${this.state.valueBrand ? this.state.valueBrand : defaultBrand}&${this.state.valuePrice ? this.state.valuePrice : defaultPrice}&${this.state.valueHighPrice ? this.state.valueHighPrice : defaultHighPrice}&${this.state.valueLowPrice ? this.state.valueLowPrice : defaultLowPrice}`)
      .then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          this.setState({
            data: responseJson.data,
          });
        }
      })
      .catch()

    this.setState({
      refreshing: false
    })
  }

  clickSearch() {
    if (this.state.txtSearch) {
      this.setState({
        refreshing: true,
        page: 2,
        brandQr: defaultBrand,
        priceQr: defaultPrice,
        openBrand: false,
        openPrice: false,
        openHighPrice: false,
        openLowPrice: false,
        searchQr: `is_search_name=1&search=${encodeURIComponent(this.state.txtSearch)}`
      })

      fetch(`${Global.url}/product/all?is_search_name=1&search=${encodeURIComponent(this.state.txtSearch)}`)
        .then((res) => res.json())
        .then((responseJson) => {
          if (responseJson.code == 202) {
            this.setState({
              data: responseJson.data,
            });
          }

        })
        .catch()

      this.setState({
        refreshing: false
      })
    }
    // console.log(encodeURIComponent(this.state.txtSearch))

  }

  loadNewData() {
    this.setState({
      refreshing: true,
      page: 2,
      brandQr: defaultBrand,
      priceQr: defaultPrice,
      openBrand: false,
      valueBrand: null,
      openPrice: false,
      valuePrice: null,
      openHighPrice: false,
      valueHighPrice: null,
      openLowPrice: false,
      valueLowPrice: null,
      searchQr: defaulSearch
    })

    fetch(`${Global.url}/product/all`)
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
    fetch(`${Global.url}/product/all?page=${this.state.page}&${this.state.priceQr}&${this.state.brandQr}&${this.state.searchQr}`)
      .then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          this.setState({
            data: this.state.data.concat(responseJson.data),
            page: this.state.page + 1
          });
        }
      })
      .catch()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.wrapper}>
          <TextInput
            style={styles.textInput}
            placeholder='Nhập sản phẩm cần tìm'
            value={this.state.txtSearch}
            onChangeText={text => this.setState({ txtSearch: text })}
            onSubmitEditing={this.clickSearch.bind(this)}
          />

          <FontAwesome5
            name='search'
            size={20}
            color='green'
            style={styles.searchIcon}
            onPress={this.clickSearch.bind(this)}
          />

          <View style={styles.switch} >
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              onValueChange={this.clickSwitch.bind(this)}
              value={this.state.isShowOption}
            />
          </View>

        </View>

        {this.state.isShowOption ? (
          <View style={{ paddingVertical: 10 }} >
            <View style={{ flexDirection: 'row' }} >
              <View style={styles.combo1} >
                <DropDownPicker
                  open={this.state.openBrand}
                  value={this.state.valueBrand}
                  items={this.state.brands}
                  setOpen={this.setOpenBrand.bind(this)}
                  setValue={this.setValueBrand.bind(this)}
                  placeholder='Hãng'
                  zIndex={60}
                  zIndexInverse={100}
                />
              </View>

              <View style={styles.combo1} >
                <DropDownPicker
                  open={this.state.openPrice}
                  value={this.state.valuePrice}
                  items={priceArr}
                  setOpen={this.setOpenPrice.bind(this)}
                  setValue={this.setValuePrice.bind(this)}
                  placeholder='Sắp xếp'
                />
              </View>

              <View style={styles.combo1} >
                <TouchableOpacity onPress={this.clickFilter.bind(this)} >
                  <View style={styles.filterButton} >
                    <Text style={styles.filterText} >
                      Áp dụng
                    </Text>
                  </View>
                </TouchableOpacity>

              </View>

            </View>

            <View style={{ flexDirection: 'row', zIndex: -1, elevation:-1 }} >
              <View style={styles.combo2} >
                <DropDownPicker
                  open={this.state.openLowPrice}
                  value={this.state.valueLowPrice}
                  items={lowPrice}
                  setOpen={this.setOpenLowPrice.bind(this)}
                  setValue={this.setValueLowPrice.bind(this)}
                  placeholder='Giá thấp nhất'
                  zIndex={30}
                />
              </View>
              <View style={styles.combo2} >
                <DropDownPicker
                  open={this.state.openHighPrice}
                  value={this.state.valueHighPrice}
                  items={highPrice}
                  setOpen={this.setOpenHighPrice.bind(this)}
                  setValue={this.setValueHighPrice.bind(this)}
                  placeholder='Giá cao nhất'
                  zIndex={30}
                />
              </View>
            </View>

          </View>
        ) : null}


        {this.state.isLoading ? (<ActivityIndicator size="large" color='red' />) : null}

        <View style={{ zIndex: -1, elevation: -1, }} >
          <FlatList
            onEndReached={this._onEndReach.bind(this)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadNewData.bind(this)}
              />
            }

            keyExtractor={(item) => item.id_product.toString()}
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ padding: 20, borderWidth: 1 }} onPress={() => { this.props.navigation.navigate('detailProduct', { id_product: `${item.id_product}` }) }} >
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                  <Image source={{ uri: `${Global.url}/image/information/${item.id_image}` }}
                    style={{ width: 130, height: 90 }}
                  />
                  <View>
                    <Text style={{ width: 200 }}  > {item.name} </Text>

                    {item.status == 0 ? (
                      <Text>Hết hàng</Text>
                    ) : (
                      <Text>Còn hàng</Text>
                    )}

                    {item.price < item.current_price ? (
                      <Text>{item.price}</Text>
                    ) : null}

                    <Text>{currencyFormat(item.current_price)}</Text>
                  </View>
                </View>
              </TouchableOpacity>

            )}
          />
        </View>
      </View>
    );
  }
  componentDidMount() {
    fetch(`${Global.url}/brand/all`)
      .then((response) => response.json())
      .then((responseJson) => {
        for (brand of responseJson.data) {
          this.setState(prevState => ({
            brands: [...prevState.brands, { label: brand.name, value: `is_brand=1&id_brand=${brand.id_brand}` }]
          }))
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${Global.url}/product/all`)
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
}

const styles = StyleSheet.create({
  wrapper: { height: height / 16, backgroundColor: '#b7e89c', flexDirection: 'row' },
  textInput: { height: height / 20, backgroundColor: '#fff', borderColor: 'green', borderRadius: 15, top: 5, width: width * 2 / 3, left: 45, padding: 10 },
  searchIcon: { left: 10, top: 15 },
  switch: { paddingHorizontal: 40 },
  combo1: { width: width * 0.35, paddingRight: 20 },
  combo2: { width: width * 0.5, paddingRight: 20, paddingTop: 5 },
  filterButton: { borderWidth: 3, justifyContent: 'center', alignItems: 'center', height: 40, margin: 5, marginRight: 10, borderRadius: 5, borderColor: '#63c522', backgroundColor: '#2dba1d' },
  filterText: { color: 'white', fontWeight: "bold", fontSize: 16 }
})