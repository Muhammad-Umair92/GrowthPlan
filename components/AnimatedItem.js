import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet, SafeAreaView, TextInput, Easing } from 'react-native';
import { Header } from '../components/Header';
import { AnimatedView } from '../components/AnimatedView';
import { GestureHandlerRootView, ScrollView, Swipeable } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';


export default function AnimatedItem({ item, onPress, selectedId, addToCart, removeFromCart }) {
    const opacity = useRef(new Animated.Value(item.isNew ? 0 : 1)).current;
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (item.isNew) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => {
                item.isNew = false;
            });
        }
    }, [item.isNew]);

    const rotateInterpolate = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });
    
    const animatedStyle = {
        opacity,
        transform: [
            { rotate: rotateInterpolate },
            { scale }
        ]
    };

    const triggerAnimation = useCallback((callback) => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (callback) callback();
        });
    }, [scale]);

    const handleAddToCart = useCallback(() => {
        triggerAnimation(() => {
            addToCart(item);
        });
    }, [triggerAnimation, addToCart, item]);

    const handleRemoveFromCart = useCallback(() => {
        triggerAnimation(() => {
            removeFromCart(item.id);
        });
    }, [triggerAnimation, removeFromCart, item.id]);

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                onPress={() => onPress(item.id)}
                style={[
                    styles.item,
                    { backgroundColor: selectedId === item.id ? 'lightblue' : 'white' }
                ]}
            >
                <ProductCard
                    addToCart={addToCart ? handleAddToCart : undefined}
                    removeFromCart={removeFromCart ? handleRemoveFromCart : undefined}
                    item={item}
                />
            </TouchableOpacity>
        </Animated.View>
    );
};



const styles = StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      // backgroundColor: 'blue'
    },
  });
