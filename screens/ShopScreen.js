import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../context/PetContext';

export default function ShopScreen() {
  const { coins, spendCoins } = usePet(); 
  const items = [
    {
      id: 1,
      name: 'Eco Food',
      description: 'Healthy food that boosts your pet’s growth.',
      price: 50,
      icon: 'leaf',
    },
    {
      id: 2,
      name: 'Toy Ball',
      description: 'Keeps your pet happy and playful!',
      price: 75,
      icon: 'basketball',
    },
    {
      id: 3,
      name: 'Water Bottle',
      description: 'Essential hydration for your eco pet.',
      price: 30,
      icon: 'water',
    },
    {
      id: 4,
      name: 'Plant Hat',
      description: 'A stylish hat made from recycled materials.',
      price: 120,
      icon: 'flower',
    },
  ];

  const handlePurchase = (item) => {
    if (coins >= item.price) {
      const success = spendCoins(item.price);
      if (success) {
        const remainingCoins = coins - item.price;
        Alert.alert(
          'Purchase Successful! 🎉',
          `You purchased ${item.name} for ${item.price} coins!\n\nRemaining coins: ${remainingCoins}`,
          [{ text: 'Awesome!', style: 'default' }]
        );
      }
    } else {
      Alert.alert(
        'Insufficient Coins 💰',
        `You need ${item.price} coins to buy ${item.name}, but you only have ${coins} coins.\n\nComplete more tasks to earn coins!`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <Text style={styles.title}>Eco Shop 🛒</Text>
        <Text style={styles.subtitle}>Buy items to care for your pet</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.balanceCard}>
          <Ionicons name="cash" size={28} color="#FFD700" />
          <Text style={styles.balanceText}>
            Your Coins: <Text style={styles.balanceValue}>{coins}</Text>
          </Text>
        </View>

        {items.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Ionicons name={item.icon} size={32} color="#4CAF50" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handlePurchase(item)}
            >
              <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.buttonGradient}>
                <Ionicons name="cart" size={20} color="#fff" />
                <Text style={styles.buttonText}>{item.price} Coins</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e8f5e9',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  balanceText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  balanceValue: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDesc: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  buyButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
});
