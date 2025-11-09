import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePet } from '../context/PetContext';
import VirtualPet from '../components/VirtualPet';
import LevelUpAnimation from '../components/LevelUpAnimation';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const { level, exp, petName, petStage, expProgress, expToNextLevel, tasksToday, showLevelUp, renamePet } = usePet();
  const [showNameModal, setShowNameModal] = useState(false);
  const [newPetName, setNewPetName] = useState('');

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (!hasLaunched) {
        // Check if pet name is still default
        const data = await AsyncStorage.getItem('petData');
        if (!data || (data && JSON.parse(data).petName === 'EcoBuddy')) {
          setShowNameModal(true);
        }
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
    }
  };

  const handleSaveName = () => {
    if (newPetName.trim().length === 0) {
      Alert.alert('Invalid Name', 'Please enter a name for your pet!');
      return;
    }
    if (newPetName.trim().length > 20) {
      Alert.alert('Name Too Long', 'Please enter a name with 20 characters or less.');
      return;
    }
    renamePet(newPetName.trim());
    AsyncStorage.setItem('hasLaunched', 'true');
    setShowNameModal(false);
    setNewPetName('');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.header}
        >
          <Text style={styles.greeting}>Welcome back! 🌱</Text>
          <Text style={styles.petName}>{petName}</Text>
        </LinearGradient>

      <View style={styles.content}>
        <View style={styles.petContainer}>
          <VirtualPet stage={petStage} />
          <LevelUpAnimation visible={showLevelUp} />
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
              <Text style={styles.statValue}>Level {level}</Text>
              <Text style={styles.statLabel}>Current Level</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color="#FF6B6B" />
              <Text style={styles.statValue}>{exp}</Text>
              <Text style={styles.statLabel}>Total EXP</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
              <Text style={styles.statValue}>{tasksToday}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progress to Level {level + 1}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${expProgress()}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {expToNextLevel()} EXP needed
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Tasks')}
        >
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={styles.buttonGradient}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Complete a Task</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color="#FFD700" />
          <Text style={styles.tipText}>
            💡 Tip: Complete eco-friendly tasks daily to help {petName} grow and learn about protecting our planet!
          </Text>
        </View>
      </View>
    </ScrollView>

    <Modal
      visible={showNameModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalIconContainer}>
            <Ionicons name="leaf" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.modalTitle}>Welcome to EcoPet! 🌱</Text>
          <Text style={styles.modalSubtitle}>Let's give your pet a name!</Text>
          
          <TextInput
            style={styles.nameInput}
            placeholder="Enter pet name..."
            placeholderTextColor="#999"
            value={newPetName}
            onChangeText={setNewPetName}
            maxLength={20}
            autoFocus={true}
            onSubmitEditing={handleSaveName}
          />
          
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveName}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Save Name</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </>
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
  greeting: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  petName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  petContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
    overflow: 'visible',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionButton: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tipCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  nameInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  saveButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

