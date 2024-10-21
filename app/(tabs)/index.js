import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Header } from '../../components/Header';
import { AnimatedView } from '../../components/AnimatedView';
import { GestureHandlerRootView, ScrollView, Swipeable } from 'react-native-gesture-handler';
import ProductCard from '../../components/ProductCard';
import Cart from '../../components/Cart';
import AnimatedItem from '../../components/AnimatedItem';

export default function App() {
  const [items, setItems] = useState([]);
  const [myCartItems, setMyCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const animationValue = useRef(new Animated.Value(1)).current;

  const productsArr = [
    {
      id: 1,
      productName: 'oil',
      productImage: 'https://cdn.britannica.com/55/157155-050-D07F5610/Containers-olive-oil.jpg?w=300',
      productPrice: 200,
      productDescription: 'item description',
      isAdded: false,
      isNew: true
    },
    {
      id: 2,
      productName: 'milk',
      productImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Milk_001.JPG/900px-Milk_001.JPG',
      productPrice: 50,
      productDescription: 'item description',
      isAdded: false,
      isNew: true
    },
    {
      id: 3,
      productName: 'bread',
      productImage: 'https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Bread-Recipe-5-2-300x300.jpg',
      productPrice: 100,
      productDescription: 'item description',
      isAdded: false,
      isNew: true
    },
  ]

  const [listOFProducts, setListOFProducts] = useState(productsArr);


  // The ItemList component handles rendering each item in the list with fade-in animation
  const ItemList = ({ items }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleItemPress = (id) => {
      setSelectedId(id);
    };

    const renderItem = ({ item }) => {
      return (
        <AnimatedItem
          item={item}
          onPress={handleItemPress}
          selectedId={selectedId}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      );
    };

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={items || []}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </GestureHandlerRootView>
    );
  };

  const addToCart = (item) => {
    const filterArr = myCartItems.filter(cartItem => cartItem.id == item.id)
    const indexOfItem = listOFProducts.findIndex((i) => i.id == item.id)
    const newValue = listOFProducts
    if (indexOfItem != -1) {
      newValue[indexOfItem].isAdded = true
    }
    setListOFProducts(newValue)
    if (filterArr.length < 1) {
      setTotal(total + item.productPrice)
      setMyCartItems([...myCartItems, { ...item }]);
    }
  }



  const removeFromCart = (id) => {
    setMyCartItems(myCartItems.filter(item => {
      if (item.id !== id) {
        return true
      }
      else {
        setTotal(total - item.productPrice)
        return false
      }
    }));

    const indexOfItem = listOFProducts.findIndex((i) => i.id == id)
    const newValue = listOFProducts
    if (indexOfItem != -1) {
      newValue[indexOfItem].isAdded = false
    }
    setListOFProducts(newValue)


  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="List Of Products" />
        <ItemList items={listOFProducts} />
        <Cart
          myCartItems={myCartItems}
          total={total}
        />
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
