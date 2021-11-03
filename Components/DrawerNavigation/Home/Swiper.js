import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native'
import Swiper from 'react-native-swiper'

import imageQc1 from '../../../image/qc1_800x300.jpg';
import imageQc2 from '../../../image/qc2_800x300.jpg';
import imageQc3 from '../../../image/qc3_800x300.jpg';
import imageQc4 from '../../../image/qc4_800x300.jpg';
import imageQc5 from '../../../image/qc5.jpeg';
import imageQc6 from '../../../image/qc6.png';

const {height, width} = Dimensions.get('window');

export default class Collection extends Component{
    render() {
        return (
            <View style ={styles.wrapper}>
                <View style={{flex:4, top: 15}}>
                    <Swiper autoplay = {true} autoplayTimeout = {4}>
                        <Image
                            source={imageQc1} style={styles.imageStyle}
                        />
                        <Image
                            source={imageQc2} style={styles.imageStyle}
                        />
                        <Image
                            source={imageQc3} style={styles.imageStyle}
                        />
                        <Image
                            source={imageQc4} style={styles.imageStyle}
                        />
                        <Image
                            source={imageQc5} style={styles.imageStyle}
                        />
                        <Image
                            source={imageQc6} style={styles.imageStyle}
                        />
                    </Swiper>
                </View>
                
            </View>
        )
    }
}

const imageWidth = width - 40;
const imageHeight = imageWidth/2.5;

const styles = StyleSheet.create({
    wrapper:{
        height: height * 0.25,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: {width: 2, height: 3},
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle:{
        height: imageHeight,
        width: imageWidth
    }
})