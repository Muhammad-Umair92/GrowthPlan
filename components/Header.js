import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export const Header = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        padding: 20,
        backgroundColor: 'tomato',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
    },
})