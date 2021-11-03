import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native'
import imageLaptopVanPhong from '../../../image/laptopvanphong.jpg'
import imageLaptopGamer from '../../../image/laptopgaming.jpg'
import imageLaptopBusiness from '../../../image/laptopdoanhnhan.jpg'
import imageLaptopDesign from '../../../image/laptopdesign.jpg'

const { height, width } = Dimensions.get('window');

export default class Collection extends Component {
    render() {
        return (
            <View>
                <View style={styles.wrapper}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>Laptop cho doanh nhân</Text>
                    </View>
                    <View style={{ flex: 4 }}>
                        <Image
                            source={imageLaptopBusiness} style={styles.imageStyle}
                        />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>Laptop cho nhân viên văn phòng</Text>
                    </View>
                    <View style={{ flex: 4 }}>
                        <Image
                            source={imageLaptopVanPhong} style={styles.imageStyle}
                        />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>Laptop cho nhà sáng tạo nội dung</Text>
                    </View>
                    <View style={{ flex: 4 }}>
                        <Image
                            source={imageLaptopDesign} style={styles.imageStyle}
                        />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>Laptop cho game thủ</Text>
                    </View>
                    <View style={{ flex: 4 }}>
                        <Image
                            source={imageLaptopGamer} style={styles.imageStyle}
                        />
                    </View>
                </View>
            </View>

        )
    }
}

const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        height: height * 0.33,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth
    }
})