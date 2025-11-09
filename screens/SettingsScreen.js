import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const settingsOptions = [
    { id: 1, title: 'Profile', icon: 'person-outline' },
    { id: 2, title: 'Notifications', icon: 'notifications-outline' },
    { id: 3, title: 'Language', icon: 'language-outline' },
    { id: 4, title: 'About', icon: 'information-circle-outline' },
    { id: 5, title: 'Log out', icon: 'log-out-outline' },
  ];

  const handleOptionPress = (option) => {
    // Handle navigation or action for each option
    if (option.title === 'Log out') {
      // Add logout logic here if needed
      console.log('Log out pressed');
    } else {
      console.log(`${option.title} pressed`);
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
                <Text style={styles.optionText}>{option.title}</Text>
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

