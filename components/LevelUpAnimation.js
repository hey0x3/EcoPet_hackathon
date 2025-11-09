import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LevelUpAnimation({ visible }) {
  const animations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    if (visible) {
      // Reset all animations
      animations.forEach(anim => anim.setValue(0));

      // Animate stars from center to corners
      const cornerPositions = [
        { x: -150, y: -150 }, // Top-left
        { x: 150, y: -150 },  // Top-right
        { x: -150, y: 150 },   // Bottom-left
        { x: 150, y: 150 },    // Bottom-right
      ];

      animations.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [visible, animations]);

  if (!visible) return null;

  const cornerPositions = [
    { x: -150, y: -150 }, // Top-left
    { x: 150, y: -150 },  // Top-right
    { x: -150, y: 150 },   // Bottom-left
    { x: 150, y: 150 },    // Bottom-right
  ];

  return (
    <View style={styles.container} pointerEvents="none">
      {animations.map((anim, index) => {
        const position = cornerPositions[index];
        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, position.x],
        });
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, position.y],
        });
        const opacity = anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1, 0],
        });
        const scale = anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.5, 0.5],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.star,
              {
                transform: [{ translateX }, { translateY }, { scale }],
                opacity,
              },
            ]}
          >
            <Ionicons name="star" size={40} color="#FFD700" />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  star: {
    position: 'absolute',
  },
});

