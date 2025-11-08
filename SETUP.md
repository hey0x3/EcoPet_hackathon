# Quick Setup Guide

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the Expo development server:**
   ```bash
   npm start
   ```

3. **Run on your device:**
   - Install Expo Go app on your phone (iOS/Android)
   - Scan the QR code shown in the terminal
   - Or press `i` for iOS simulator, `a` for Android emulator

## Assets Note

The app references some image assets in `app.json`:
- `./assets/icon.png` - App icon
- `./assets/splash.png` - Splash screen
- `./assets/adaptive-icon.png` - Android adaptive icon
- `./assets/favicon.png` - Web favicon

For now, the app will work without these assets, but you can add them later for a complete experience. Expo will use default placeholders if these files don't exist.

## Features Implemented

✅ Virtual pet with 4 evolution stages (Egg → Baby → Teen → Adult)
✅ 8 eco-friendly tasks with EXP rewards
✅ Educational content about climate change
✅ Statistics and progress tracking
✅ Achievement system
✅ Environmental impact calculations
✅ Daily task tracking
✅ Persistent data storage (AsyncStorage)

## Next Steps (Optional Enhancements)

- Add actual image assets
- Add pet animations
- Add sound effects
- Add social sharing features
- Add push notifications for daily reminders
- Add more educational content
- Add quizzes to test knowledge

