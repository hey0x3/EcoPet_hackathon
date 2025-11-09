# EcoPet - Quick Start Guide

## 🚀 Running the App

```bash
npx expo start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for Web

## 🎯 First Launch Experience

1. **Step 1: Your Name** - Enter your name
2. **Step 2: Pet Name** - Name your eco buddy
3. **Main App Opens** - See greeting: "Hello [your name] (and [pet name])!"
4. **Start completing eco tasks!**

## 🌍 Changing Language

1. Tap **Settings** (gear icon in any tab header)
2. Tap **Language**
3. Select: English, Türkçe, or Bosanski
4. Language changes **instantly** (no reload)

## 👤 Editing Profile

1. Go to **Settings** → **Profile**
2. Edit your **Name** and **City**
3. Tap **Save**
4. Your greeting on Home screen updates automatically

## 🔔 Setting Up Notifications

1. Go to **Settings** → **Notifications**
2. Toggle **Daily Reminder** ON
3. You'll get reminded at 7:00 PM daily
4. Test with "Send Test Notification" button

## 🔄 Resetting the App

1. Go to **Settings** → **Log out & Delete Progress**
2. Confirm deletion
3. All progress deleted (language preference kept)
4. Returns to onboarding screen

## 📱 App Structure

### Main Tabs
- **Home** - Pet overview, stats, progress
- **Tasks** - Complete eco-friendly tasks
- **Learn** - AI chat about climate/sustainability
- **Stats** - View your impact and achievements
- **Shop** - Buy items with earned coins

### Settings Menu
- **Profile** - Edit name and city
- **Notifications** - Daily reminder toggle
- **Language** - Switch between en/tr/bs
- **About** - App information
- **Log out & Delete Progress** - Reset everything

## 💾 Data Storage

All data stored locally using AsyncStorage:
- `pet.name` - Your pet's name
- `profile.name` - Your name
- `profile.city` - Your city
- `app.lang` - Language preference (en/tr/bs)
- `notifications.enabled` - Notification setting
- `petData` - All pet stats and progress

## 🎨 Design Features

- **Clean white backgrounds**
- **Green accent color** (#4CAF50)
- **Outline icons** throughout
- **Smooth animations**
- **Instant language switching**
- **No runtime errors**

## 🌟 Key Features

1. **Instant i18n** - Language changes without reload
2. **Smart greetings** - Shows pet name or your profile
3. **One-step onboarding** - Just pet name, that's it
4. **Editable profile** - Change name/city anytime
5. **Daily reminders** - Optional 7 PM notifications
6. **Clean reset** - Delete all but keep language

## 🐛 Troubleshooting

### App won't start?
```bash
npm install
npx expo start --clear
```

### Notifications not working?
- Check device permissions
- Enable notifications in device settings
- Test with "Send Test Notification" button

### Language not changing?
- Should be instant, no reload needed
- Check AsyncStorage is working
- Try restarting the app

## 📚 Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation
- **AsyncStorage** - Local storage
- **expo-notifications** - Push notifications
- **expo-linear-gradient** - Gradients
- **Ionicons** - Icons

## 🎓 For Developers

### Adding a new language:
1. Edit `src/i18n/strings.js`
2. Add new language object (e.g., `de: { ... }`)
3. Update `LanguageScreen.js` LANGUAGES array
4. Update `LanguageContext.js` validation array

### Adding a new screen:
1. Create screen in `screens/` folder
2. Import in `App.js`
3. Add to appropriate Stack Navigator
4. Add i18n strings if needed

### Modifying translations:
Edit `src/i18n/strings.js` - changes apply instantly!

---
**Ready to save the planet? Start the app and complete your first eco task! 🌱**
