import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default class Header extends Component{
    render() {
        return (
            <View>
                {/* <TouchableOpacity style={{height: height/8}}>
                    <Text>Open menue</Text>
                </TouchableOpacity> */}
                <Text>Header</Text>
            </View>
        )
    }
}