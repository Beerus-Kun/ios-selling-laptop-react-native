import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const {height, width} = Dimensions.get('window');

export default class Header extends Component{
    render() {
        return (
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Nhập sản phẩm cần tìm'
                />

                <FontAwesome5 
                    name='search'
                    size= {20}
                    color= 'green'
                    style= {styles.searchIcon}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    wrapper: {height: height/16, backgroundColor: '#b7e89c', flexDirection:'row'},
    textInput: {height: height/20, backgroundColor:'#fff', borderColor:'green', borderRadius:15, top: 5, width: width*2/3, left: 45, padding: 10},
    searchIcon: {left: 10, top: 15}
})