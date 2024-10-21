import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Header } from '../../components/Header';
import { AnimatedView } from '../../components/AnimatedView';
import { GestureHandlerRootView, ScrollView, Swipeable } from 'react-native-gesture-handler';
import ProductCard from '../../components/ProductCard';

export default function App() {
  const [items, setItems] = useState([]);
  const [myCartItems, setMyCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState(0);
  const [description, setDescription] = useState(0);
  const animationValue = useRef(new Animated.Value(1)).current;

  // Define an Item prototype-based object with methods to handle item state
  function Item(id, name, price, description, isNew) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.isNew = isNew; // Add this flag to mark new items
  }

  Item.prototype.toggleComplete = function () {
    this.completed = !this.completed;
  };

  Item.prototype.changeName = function (newName) {
    this.name = newName;
  };


  const listOFProducts = [
    {
      id: 1,
      productName: 'oil',
      productImage: 'https://cdn.britannica.com/55/157155-050-D07F5610/Containers-olive-oil.jpg?w=300',
      productPrice: 200,
      productDescription: 'item description',
      isNew: true
    },
    {
      id: 2,
      productName: 'milk',
      productImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Milk_001.JPG/900px-Milk_001.JPG',
      productPrice: 50,
      productDescription: 'item description',
      isNew: true
    },
    {
      id: 3,
      productName: 'bread',
      productImage: 'https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Bread-Recipe-5-2-300x300.jpg',
      productPrice: 100,
      productDescription: 'item description',
      isNew: true
    },
  ]


  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // The ItemList component handles rendering each item in the list with fade-in animation
  const ItemList = ({ items, removeItem }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleItemPress = (id) => {
      // console.log(id, '$$$$$$$$$')
      setSelectedId(id);
    };

    const renderItem = ({ item }) => {
      return (
        <AnimatedItem
          item={item}
          onPress={handleItemPress}
          removeItem={removeItem}
          selectedId={selectedId}
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
    if (filterArr.length < 1) {

      setTotal(total + item.productPrice)
      setMyCartItems([...myCartItems, item]);
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
  }

  // Individual Animated Item Component
  const AnimatedItem = ({ item, onPress, removeItem, selectedId }) => {
    const opacity = useRef(new Animated.Value(0)).current; // Initial opacity is 0

    useEffect(() => {
      if (item.isNew) {
        // Fade-in effect only for new items
        Animated.timing(opacity, {
          toValue: 1, // Animate opacity to 1
          duration: 1000, // 500ms for fade-in
          useNativeDriver: true,
        }).start(() => {
          // Once the animation completes, mark the item as no longer new
          item.isNew = false;
        });
      }
    }, []);

    return (
      <View>
        {item.isNew ? (
          // Only wrap the new item in an Animated.View
          <Animated.View style={{ opacity }}>
            <TouchableOpacity
              onPress={() => onPress(item.id)}
              style={[
                styles.item,
                { backgroundColor: selectedId === item.id ? 'lightblue' : 'white' }
              ]}
            >
              <ProductCard
                productName={item.productName}
                productDescription={item.productDescription}
                productPrice={item.productPrice}
                productImage={item.productImage}
                addToCart={(item) => addToCart(item)}
                removeFromCart={(id) => removeFromCart(id)}
                item={item}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          // For existing items, use a regular View
          <View>
            <TouchableOpacity
              onPress={() => onPress(item.id)}
              style={[
                styles.item,
                { backgroundColor: selectedId === item.id ? 'lightblue' : 'white' }
              ]}
            >
              <ProductCard
                productName={item.productName}
                productDescription={item.productDescription}
                productPrice={item.productPrice}
                productImage={item.productImage}
                addToCart={(item) => addToCart(item)}
                removeFromCart={(id) => removeFromCart(id)}
                item={item}

              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <ProductCard
          productName={item.productName}
          productDescription={item.productDescription}
          productPrice={item.productPrice}
          productImage={item.productImage}
          // addToCart={(item) => addToCart(item)}
          // removeFromCart={(id) => removeFromCart(id)}
          item={item}
        />
      </View>
    );
  };


  function CartComponent() {
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="List Of Products" />
        <ItemList items={listOFProducts} removeItem={removeItem} />
        <CartComponent />
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
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    // backgroundColor: 'blue'
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
