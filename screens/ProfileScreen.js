import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../src/i18n/LanguageContext';

export default function ProfileScreen() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profile.name');
      const savedCity = await AsyncStorage.getItem('profile.city');
      if (savedName) setName(savedName);
      if (savedCity) setCity(savedCity);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('profile.name', name.trim());
      await AsyncStorage.setItem('profile.city', city.trim());
      Alert.alert('✓', t('saved'));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>{t('name')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enter_name')}
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            maxLength={30}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t('city')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enter_city')}
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
            maxLength={30}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>{t('save')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
