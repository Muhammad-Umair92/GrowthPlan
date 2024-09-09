import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet } from 'react-native';


export const AnimatedView = ({ animationValue }) => {
    const scaleStyle = {
        transform: [{ scale: animationValue }]
    };

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(animationValue, {
                toValue: 1.5,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 3.5,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[styles.animatedBox, scaleStyle]} >
                <Text>Animated</Text>
                <Text>Scalable View</Text>
                <Text>on press</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    animatedBox: {
        width: 100,
        height: 100,
        backgroundColor: 'lightgreen',
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

})