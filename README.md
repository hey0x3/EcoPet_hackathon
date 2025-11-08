# Climate Pet - Educational Mobile App

A fun, educational mobile app designed to help people take action against climate change in their daily lives. Users have a virtual pet that grows and evolves as they complete real-world, eco-friendly tasks.

## Features

- 🐾 **Virtual Pet System**: Your pet grows from an egg to an adult as you complete tasks
- ✅ **Eco-Friendly Tasks**: Complete tasks like picking up litter, saving water, recycling, and more
- 📊 **Progress Tracking**: Track your EXP, level, and environmental impact
- 📚 **Educational Content**: Learn about climate change, waste reduction, water conservation, and more
- 🏆 **Achievement System**: Unlock achievements as you progress
- 📈 **Statistics**: View your daily and total task completions and environmental impact

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

## Project Structure

```
climate-pet-app/
├── App.js                 # Main app component with navigation
├── context/
│   └── PetContext.js      # Pet state management (EXP, level, tasks)
├── screens/
│   ├── HomeScreen.js      # Main screen with pet display
│   ├── TasksScreen.js     # List of eco-friendly tasks
│   ├── EducationScreen.js # Educational content about climate
│   └── StatsScreen.js     # Statistics and achievements
├── components/
│   └── VirtualPet.js      # Pet visual component
└── package.json
```

## Technologies Used

- React Native
- Expo
- React Navigation
- AsyncStorage (for data persistence)
- Expo Linear Gradient
- Expo Vector Icons

## Task Categories

- **Waste Reduction**: Picking up litter, recycling, using reusable bags
- **Water Conservation**: Shorter showers, fixing leaks
- **Energy Conservation**: Turning off lights, using renewable energy
- **Transportation**: Walking, biking, using public transport
- **Nature**: Planting trees, caring for plants
- **Food**: Meatless meals, supporting local produce

## Pet Evolution Stages

1. **Egg** 🥚 - Starting out (Level 1)
2. **Baby** 🌱 - Growing (Level 2-3)
3. **Teenager** 🌿 - Getting stronger (Level 3-5)
4. **Adult** 🌳 - Fully grown (Level 5+)

## Contributing

This is a hackathon project focused on Quality Education and Climate Action. Feel free to extend it with:
- More task types
- Social features
- Community challenges
- Advanced statistics
- Educational quizzes

## License

This project is created for the Global Hackathon.

