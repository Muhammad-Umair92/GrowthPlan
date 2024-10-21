import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet, Dimensions, Image } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ProductCard({ productName, productPrice, productDescription, productImage, addToCart, item, removeFromCart }) {
    // console.log({ item })
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>Name: {productName}</Text>
                <Text style={styles.price}>Price: {productPrice}</Text>
                <Text style={styles.description}>Description: {productDescription}</Text>
                {addToCart && <TouchableOpacity style={styles.add} onPress={() => addToCart(item)}>
                    <Text>Add To Cart</Text>
                </TouchableOpacity>}
                {removeFromCart && <TouchableOpacity style={styles.remove} onPress={() => removeFromCart(item.id)}>
                    <Text>Remove From Cart</Text>
                </TouchableOpacity>}
            </View>
            <View>
                <Image source={{ uri: productImage }} style={{ width: 100, height: 100 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
        // backgroundColor: 'yellow'
    },
    name: {
        color: 'black',
        textTransform: 'uppercase'
        // backgroundColor: 'red'
    },
    add: {
        borderWidth: 1,
        alignItems: 'center',
        margin: 5
        // borderC
    },
    remove: {
        borderWidth: 1,
        alignItems: 'center',
        margin: 5
        // borderC
    },
})