import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Swiper from './Swiper';
import Collection from './Collection';
import TopProduct from './TopProduct';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Swiper />
        <TopProduct props = {this.props} />
        <Collection />
      </ScrollView>
    );
  }
}

