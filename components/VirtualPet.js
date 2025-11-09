import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VirtualPet({ stage }) {
  const getPetVisual = () => {
    switch (stage) {
      case 'egg':
        return {
          icon: 'ellipse',
          size: 80,
          color: '#FFD93D',
          emoji: '🥚',
          message: 'I\'m just starting out! Help me grow!',
        };
      case 'baby':
        return {
          icon: 'leaf',
          size: 100,
          color: '#6BCB77',
          emoji: '🌱',
          message: 'I\'m growing! Keep up the good work!',
        };
      case 'teen':
        return {
          icon: 'flower',
          size: 120,
          color: '#4ECDC4',
          emoji: '🌿',
          message: 'I\'m getting stronger! More tasks please!',
        };
      case 'adult':
        return {
          icon: 'leaf',
          size: 140,
          color: '#4CAF50',
          emoji: '🌳',
          message: 'I\'m fully grown! Together we can save the planet!',
        };
      default:
        return {
          icon: 'ellipse',
          size: 80,
          color: '#FFD93D',
          emoji: '🥚',
          message: 'I\'m just starting out!',
        };
    }
  };

  const pet = getPetVisual();

  return (
    <View style={styles.container}>
      <View style={[styles.petCircle, { width: pet.size, height: pet.size, borderRadius: pet.size / 2 }]}>
        <Text style={styles.emoji}>{pet.emoji}</Text>
      </View>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{pet.message}</Text>
      </View>
      <View style={styles.petInfo}>
        <Ionicons name={pet.icon} size={24} color={pet.color} />
        <Text style={[styles.stageText, { color: pet.color }]}>
          {stage.charAt(0).toUpperCase() + stage.slice(1)} Stage
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  petCircle: {
    backgroundColor: '#F0F8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#4CAF50',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  emoji: {
    fontSize: 60,
  },
  messageBubble: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    maxWidth: 250,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stageText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

