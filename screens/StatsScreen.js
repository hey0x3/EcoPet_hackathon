import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePet } from '../context/PetContext';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  const {
    exp,
    level,
    petName,
    petStage,
    totalTasksCompleted,
    tasksToday,
    expProgress,
    expToNextLevel,
  } = usePet();

  const getStageName = (stage) => {
    const stages = {
      egg: 'Egg 🥚',
      baby: 'Baby 🌱',
      teen: 'Teenager 🌿',
      adult: 'Adult 🌳',
    };
    return stages[stage] || stage;
  };

  const getAchievements = () => {
    const achievements = [];
    if (level >= 2) achievements.push({ name: 'First Steps', icon: 'footsteps', color: '#4CAF50' });
    if (level >= 3) achievements.push({ name: 'Growing Strong', icon: 'trending-up', color: '#4ECDC4' });
    if (level >= 5) achievements.push({ name: 'Eco Champion', icon: 'trophy', color: '#FFD700' });
    if (totalTasksCompleted >= 10) achievements.push({ name: 'Task Master', icon: 'checkmark-circle', color: '#FF6B6B' });
    if (totalTasksCompleted >= 50) achievements.push({ name: 'Climate Hero', icon: 'shield', color: '#9B59B6' });
    if (tasksToday >= 3) achievements.push({ name: 'Daily Warrior', icon: 'flame', color: '#FF8C00' });
    return achievements;
  };

  const achievements = getAchievements();

  const getImpactStats = () => {
    // Estimated impact based on tasks completed
    const litterPicked = totalTasksCompleted * 0.3; // 30% of tasks might be litter
    const waterSaved = totalTasksCompleted * 0.2 * 10; // 20% might be water, ~10 gallons each
    const co2Reduced = totalTasksCompleted * 0.15 * 2; // 15% might be transport, ~2kg CO2 each
    const itemsRecycled = totalTasksCompleted * 0.25 * 3; // 25% might be recycling, ~3 items each

    return {
      litterPicked: Math.round(litterPicked),
      waterSaved: Math.round(waterSaved),
      co2Reduced: Math.round(co2Reduced * 10) / 10,
      itemsRecycled: Math.round(itemsRecycled),
    };
  };

  const impact = getImpactStats();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#45a049']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Stats</Text>
        <Text style={styles.headerSubtitle}>Track your climate impact!</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Pet Progress</Text>
          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="person" size={24} color="#4CAF50" />
                <Text style={styles.statValue}>{petName}</Text>
                <Text style={styles.statLabel}>Pet Name</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="leaf" size={24} color="#6BCB77" />
                <Text style={styles.statValue}>{getStageName(petStage)}</Text>
                <Text style={styles.statLabel}>Current Stage</Text>
              </View>
            </View>
          </View>

          <View style={styles.statCard}>
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
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Task Statistics</Text>
          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
                <Text style={styles.statValue}>{totalTasksCompleted}</Text>
                <Text style={styles.statLabel}>Total Tasks</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="today" size={24} color="#45B7D1" />
                <Text style={styles.statValue}>{tasksToday}</Text>
                <Text style={styles.statLabel}>Today</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          <View style={styles.impactCard}>
            <View style={styles.impactItem}>
              <Ionicons name="trash" size={28} color="#FF6B6B" />
              <Text style={styles.impactValue}>{impact.litterPicked}</Text>
              <Text style={styles.impactLabel}>Pieces of litter picked up</Text>
            </View>
            <View style={styles.impactItem}>
              <Ionicons name="water" size={28} color="#4ECDC4" />
              <Text style={styles.impactValue}>{impact.waterSaved}</Text>
              <Text style={styles.impactLabel}>Gallons of water saved</Text>
            </View>
            <View style={styles.impactItem}>
              <Ionicons name="leaf" size={28} color="#6BCB77" />
              <Text style={styles.impactValue}>{impact.co2Reduced} kg</Text>
              <Text style={styles.impactLabel}>CO₂ emissions reduced</Text>
            </View>
            <View style={styles.impactItem}>
              <Ionicons name="recycle" size={28} color="#45B7D1" />
              <Text style={styles.impactValue}>{impact.itemsRecycled}</Text>
              <Text style={styles.impactLabel}>Items recycled</Text>
            </View>
          </View>
        </View>

        {achievements.length > 0 && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsContainer}>
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementBadge}>
                  <Ionicons name={achievement.icon} size={32} color={achievement.color} />
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.motivationCard}>
          <Ionicons name="heart" size={32} color="#FF6B6B" />
          <Text style={styles.motivationText}>
            Every action counts! Keep up the amazing work in protecting our planet! 🌍💚
          </Text>
        </View>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  statsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
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
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
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
  impactCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  impactItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  impactValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  impactLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  achievementBadge: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: '#FFF0F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    marginTop: 10,
  },
  motivationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
});

