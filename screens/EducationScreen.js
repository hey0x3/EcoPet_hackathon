import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const EDUCATIONAL_CONTENT = [
  {
    id: 1,
    title: 'Climate Change Basics',
    icon: 'globe',
    color: '#4CAF50',
    content: `Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, human activities since the mid-20th century have been the primary driver of climate change.

Key Facts:
• Global temperatures have risen about 1.1°C since 1880
• The last decade was the warmest on record
• Sea levels are rising at an accelerating rate
• Extreme weather events are becoming more frequent

What causes it?
The main cause is the greenhouse effect, where gases like CO2 trap heat in Earth's atmosphere. Burning fossil fuels, deforestation, and industrial processes increase these gases.`,
  },
  {
    id: 2,
    title: 'Why Waste Reduction Matters',
    icon: 'trash',
    color: '#FF6B6B',
    content: `Waste reduction is crucial for protecting our planet. Every item we throw away has an environmental cost.

The Problem:
• Landfills produce methane, a potent greenhouse gas
• Plastic waste harms marine life and ecosystems
• Manufacturing new products consumes energy and resources
• Waste often ends up in oceans and natural habitats

The Solution:
• Reduce: Buy only what you need
• Reuse: Find new purposes for items
• Recycle: Turn waste into new products
• Compost: Turn organic waste into soil nutrients

Small actions add up! Every piece of litter picked up, every item recycled, makes a difference.`,
  },
  {
    id: 3,
    title: 'Water Conservation',
    icon: 'water',
    color: '#4ECDC4',
    content: `Water is essential for life, but it's a finite resource. Only 2.5% of Earth's water is fresh, and less than 1% is accessible.

Why Save Water?
• Reduces energy needed for water treatment
• Preserves ecosystems and wildlife
• Ensures water availability for future generations
• Saves money on utility bills

Simple Ways to Conserve:
• Take shorter showers (saves 2.5 gallons per minute)
• Fix leaks immediately
• Use water-efficient appliances
• Collect rainwater for plants
• Turn off taps when not in use

Every drop counts! A 5-minute shower uses about 10-25 gallons of water.`,
  },
  {
    id: 4,
    title: 'Renewable Energy',
    icon: 'flash',
    color: '#FFD700',
    content: `Renewable energy comes from natural sources that are constantly replenished, unlike fossil fuels.

Types of Renewable Energy:
• Solar: Energy from the sun
• Wind: Energy from wind turbines
• Hydroelectric: Energy from flowing water
• Geothermal: Energy from Earth's heat
• Biomass: Energy from organic materials

Benefits:
• Reduces greenhouse gas emissions
• Creates sustainable energy supply
• Decreases air pollution
• Creates green jobs
• Reduces dependence on fossil fuels

What You Can Do:
• Support renewable energy programs
• Use energy-efficient appliances
• Turn off lights and electronics when not in use
• Consider solar panels for your home
• Choose green energy providers`,
  },
  {
    id: 5,
    title: 'Sustainable Transportation',
    icon: 'bicycle',
    color: '#95E1D3',
    content: `Transportation accounts for a significant portion of global greenhouse gas emissions.

The Impact:
• Cars and trucks produce about 20% of CO2 emissions
• Air travel has a large carbon footprint
• Traffic congestion wastes fuel and time
• Vehicle manufacturing consumes resources

Eco-Friendly Alternatives:
• Walk or bike for short trips
• Use public transportation
• Carpool with others
• Choose electric or hybrid vehicles
• Plan efficient routes

Benefits:
• Reduces air pollution
• Saves money on fuel
• Improves physical health
• Reduces traffic congestion
• Lowers carbon footprint

Every mile you walk or bike instead of driving saves about 0.4 kg of CO2!`,
  },
  {
    id: 6,
    title: 'The Power of Trees',
    icon: 'leaf',
    color: '#6BCB77',
    content: `Trees are nature's superheroes in the fight against climate change.

What Trees Do:
• Absorb CO2 from the atmosphere
• Produce oxygen we breathe
• Provide habitat for wildlife
• Cool urban areas
• Prevent soil erosion
• Filter air and water

The Numbers:
• One tree can absorb 48 pounds of CO2 per year
• A mature tree produces enough oxygen for 2-10 people
• Trees can reduce energy costs by 20-50%
• Urban trees remove 711,000 tons of air pollution annually

How to Help:
• Plant native trees in your area
• Support reforestation projects
• Care for existing trees
• Choose sustainable wood products
• Reduce paper consumption

Remember: The best time to plant a tree was 20 years ago. The second best time is now!`,
  },
];

export default function EducationScreen() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn About Climate Change</Text>
        <Text style={styles.headerSubtitle}>
          Expand your knowledge and become a climate champion!
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {EDUCATIONAL_CONTENT.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => toggleCard(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon} size={32} color={item.color} />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Ionicons
                name={expandedCard === item.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#999"
              />
            </View>
            {expandedCard === item.id && (
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>{item.content}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🌍 Knowledge is power! Keep learning and taking action.
        </Text>
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
  contentContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cardText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginTop: 15,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

