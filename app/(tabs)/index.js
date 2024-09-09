import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Animated, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '../../components/Header';
import { AnimatedView } from '../../components/AnimatedView';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

export default function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const animationValue = useRef(new Animated.Value(1)).current;

  // Define an Item prototype-based object with methods to handle item state
  function Item(id, name, completed, isNew) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.isNew = isNew; // Add this flag to mark new items
  }

  Item.prototype.toggleComplete = function () {
    this.completed = !this.completed;
  };

  Item.prototype.changeName = function (newName) {
    this.name = newName;
  };

  const addItem = () => {
    setCount(prev => prev + 1);
    const newItem = new Item(count, `Item ${count}`, false, true); // Set isNew to true
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Header title="Interactive List" />
        <AnimatedView animationValue={animationValue} />
        <Button title="Add Item" onPress={addItem} />
        <ItemList items={items} removeItem={removeItem} />
      </View>
    </SafeAreaView>
  );
}

// The ItemList component handles rendering each item in the list with fade-in animation
const ItemList = ({ items, removeItem }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleItemPress = (id) => {
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
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </GestureHandlerRootView>
  );
};

// Individual Animated Item Component
const AnimatedItem = ({ item, onPress, removeItem, selectedId }) => {
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    if (item.isNew) {
      // Fade-in effect only for new items
      Animated.timing(opacity, {
        toValue: 1, // Animate opacity to 1
        duration: 500, // 500ms for fade-in
        useNativeDriver: true,
      }).start(() => {
        // Once the animation completes, mark the item as no longer new
        item.isNew = false;
      });
    }
  }, []);

  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <View style={styles.deleteBox}>
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </TouchableOpacity>
      )}
    >
      {item.isNew ? (
        // Only wrap the new item in an Animated.View
        <Animated.View style={{ opacity }}>
          <TouchableOpacity
            onPress={() => onPress(item.id)}
            onLongPress={() => removeItem(item.id)}
            style={[
              styles.item,
              { backgroundColor: selectedId === item.id ? 'lightblue' : 'white' }
            ]}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        // For existing items, use a regular View
        <View>
          <TouchableOpacity
            onPress={() => onPress(item.id)}
            onLongPress={() => removeItem(item.id)}
            style={[
              styles.item,
              { backgroundColor: selectedId === item.id ? 'lightblue' : 'white' }
            ]}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Swipeable>
  );
};

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
