import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePet } from '../context/PetContext';
import { Ionicons } from '@expo/vector-icons';

const TASKS = [
  {
    id: 1,
    title: 'Pick Up Litter',
    description: 'Collect and properly dispose of 5 pieces of litter',
    exp: 20,
    icon: 'trash',
    color: '#FF6B6B',
    category: 'Waste Reduction',
    tips: [
      'Always wear gloves when picking up litter',
      'Separate recyclables from trash',
      'Dispose of items in proper bins',
      'Encourage others to do the same!'
    ],
  },
  {
    id: 2,
    title: 'Save Water',
    description: 'Take a shorter shower (5 minutes or less)',
    exp: 20,
    icon: 'water',
    color: '#4ECDC4',
    category: 'Water Conservation',
    tips: [
      'Turn off water while soaping',
      'Use a timer to track shower time',
      'Fix any leaks in your home',
      'Collect rainwater for plants'
    ],
  },
  {
    id: 3,
    title: 'Recycle Properly',
    description: 'Sort and recycle 3 items correctly',
    exp: 30,
    icon: 'refresh',
    exp: 40,
    icon: 'recycle',
    color: '#45B7D1',
    category: 'Waste Reduction',
    tips: [
      'Rinse containers before recycling',
      'Check local recycling guidelines',
      'Remove labels when possible',
      'Separate different materials'
    ],
  },
  {
    id: 4,
    title: 'Use Reusable Bag',
    description: 'Use a reusable bag instead of plastic',
    exp: 20,
    icon: 'bag',
    color: '#96CEB4',
    category: 'Waste Reduction',
    tips: [
      'Keep reusable bags in your car',
      'Use cloth bags for groceries',
      'Say no to plastic bags',
      'Wash reusable bags regularly'
    ],
  },
  {
    id: 5,
    title: 'Walk or Bike',
    description: 'Walk or bike instead of driving for short trips',
    exp: 40,
    icon: 'bicycle',
    color: '#95E1D3',
    category: 'Transportation',
    tips: [
      'Plan your route ahead',
      'Use bike lanes when available',
      'Combine multiple errands',
      'Enjoy the exercise!'
    ],
  },
  {
    id: 6,
    title: 'Turn Off Lights',
    description: 'Turn off lights when leaving a room',
    exp: 20,
    icon: 'bulb',
    color: '#FFD93D',
    category: 'Energy Conservation',
    tips: [
      'Use natural light when possible',
      'Install LED bulbs',
      'Use timers for outdoor lights',
      'Unplug unused electronics'
    ],
  },
  {
    id: 7,
    title: 'Plant a Tree',
    description: 'Plant a tree or care for existing plants',
    exp: 60,
    icon: 'leaf',
    color: '#6BCB77',
    category: 'Nature',
    tips: [
      'Choose native species',
      'Water regularly',
      'Plant in appropriate season',
      'Research proper care'
    ],
  },
  {
    id: 8,
    title: 'Meatless Meal',
    description: 'Have a vegetarian or vegan meal',
    exp: 40,
    icon: 'restaurant',
    color: '#F38BA8',
    category: 'Food',
    tips: [
      'Try plant-based proteins',
      'Explore new recipes',
      'Reduce meat consumption gradually',
      'Support local produce'
    ],
  },
];

export default function TasksScreen() {
  const { completeTask } = usePet();
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCompleteTask = (task) => {
    const coinsEarned = Math.floor((task.exp / 100) * 5);
    Alert.alert(
      'Task Completed! 🎉',
      `You earned ${task.exp} EXP${coinsEarned > 0 ? ` and ${coinsEarned} coins` : ''}!\n\n${task.description}`,
      [
        {
          text: 'Awesome!',
          onPress: () => {
            completeTask(task.exp, task.id);
            setModalVisible(false);
          },
        },
      ]
    );
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eco-Friendly Tasks</Text>
          <Text style={styles.headerSubtitle}>
            Complete tasks to help your pet grow and protect the planet!
          </Text>
        </View>

        <View style={styles.tasksContainer}>
          {TASKS.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => openTaskDetails(task)}
            >
              <View style={[styles.taskIconContainer, { backgroundColor: `${task.color}20` }]}>
                <Ionicons name={task.icon} size={32} color={task.color} />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <View style={styles.taskFooter}>
                  <View style={styles.expBadge}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.expText}>{task.exp} EXP</Text>
                  </View>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTask && (
              <>
                <View style={[styles.modalIconContainer, { backgroundColor: `${selectedTask.color}20` }]}>
                  <Ionicons name={selectedTask.icon} size={48} color={selectedTask.color} />
                </View>
                <Text style={styles.modalTitle}>{selectedTask.title}</Text>
                <Text style={styles.modalDescription}>{selectedTask.description}</Text>
                
                <View style={styles.modalRewards}>
                  <View style={styles.modalExpBadge}>
                    <Ionicons name="star" size={20} color="#FFD700" />
                    <Text style={styles.modalExpText}>{selectedTask.exp} EXP</Text>
                  </View>
                  {Math.floor((selectedTask.exp / 100) * 5) > 0 && (
                    <View style={styles.modalCoinBadge}>
                      <Ionicons name="cash" size={20} color="#FFD700" />
                      <Text style={styles.modalCoinText}>{Math.floor((selectedTask.exp / 100) * 5)} Coins</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.tipsSection}>
                  <Text style={styles.tipsTitle}>💡 Tips:</Text>
                  {selectedTask.tips.map((tip, index) => (
                    <View key={index} style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.completeButton, { backgroundColor: selectedTask.color }]}
                    onPress={() => handleCompleteTask(selectedTask)}
                  >
                    <Text style={styles.completeButtonText}>Complete Task</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tasksContainer: {
    padding: 15,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  taskIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  expText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginLeft: 5,
  },
  taskCategory: {
    fontSize: 12,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: '90%',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalRewards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 25,
  },
  modalExpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  modalExpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginLeft: 8,
  },
  modalCoinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  modalCoinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  tipsSection: {
    marginBottom: 25,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  completeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

