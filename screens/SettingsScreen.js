import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../src/i18n/LanguageContext';

export default function SettingsScreen({ navigation }) {
  const { t } = useLanguage();

  const settingsOptions = [
    { id: 1, key: 'profile', icon: 'person-outline', screen: 'Profile' },
    { id: 2, key: 'notifications', icon: 'notifications-outline', screen: 'Notifications' },
    { id: 3, key: 'language', icon: 'language-outline', screen: 'Language' },
    { id: 4, key: 'about', icon: 'information-circle-outline', screen: 'About' },
    { id: 5, key: 'reset', icon: 'log-out-outline', screen: 'Reset' },
  ];

  const handleOptionPress = (option) => {
    if (option.screen) {
      navigation.navigate(option.screen);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {settingsOptions.map((option, index) => (
          <View key={option.id}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleOptionPress(option)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <Ionicons name={option.icon} size={24} color="#333" style={styles.optionIcon} />
                <Text style={styles.optionText}>{t(option.key)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
            {index < settingsOptions.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
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
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 59, // Align with text (icon width + margin)
  },
});

