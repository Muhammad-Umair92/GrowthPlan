import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Header } from '../components/Header';
import { AnimatedView } from '../components/AnimatedView';
import { GestureHandlerRootView, ScrollView, Swipeable } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';
import AnimatedItem from './AnimatedItem';


export default function Cart({ myCartItems, total }) {

    const handleItemPress = (id) => {
        // setSelectedId(id);
    };

    const renderItem = ({ item }) => {
        return (
            <AnimatedItem
                item={item}
                onPress={handleItemPress}
            />
        );
    };


    return (
        <>
            <Header title="My Cart" />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>Total Amount: </Text>
                    <Text> {total} </Text>
                </View>
                <FlatList
                    data={myCartItems || []}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </GestureHandlerRootView>
        </>
    )
}