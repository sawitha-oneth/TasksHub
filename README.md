# TasksHub - Persistent Storage & Local Notifications

**Name:**  Svitha Oneth  
**Student ID:**  PE/2022/051   
**Course:**  Mobile Application Development - Practical 07

## 1. Project Overview
TasksHub is a React Native application built with Expo that demonstrates how to use Persistent Storage, Local Notifications, and Image Picker. The app allows users to create tasks, save them permanently on the device (even after closing the app), pick a profile image from the gallery, and receive a local notification when a task is saved.

## 2. Key Features Implemented
- **File-Based Routing (Hybrid):** Used Expo Router with a Bottom Tab Navigator (Dashboard, Profile) and a Modal Stack screen (Add Task).
- **AsyncStorage:** Implemented `@react-native-async-storage/async-storage` to persist task data and user profile details. Data is stringified (`JSON.stringify`) before saving and parsed (`JSON.parse`) when loading.
- **Local Notifications:** Integrated `expo-notifications` with a foreground handler. When a new task is saved, an immediate local notification is triggered.
- **Image Picker:** Integrated `expo-image-picker` to allow users to select a profile picture from their device gallery.
- **Data Clearing:** Added a feature to completely clear all local storage data.

## 3. How AsyncStorage & Notifications Were Used
- **Storage Logic:** In `add-task.tsx`, we fetch existing tasks, push the new task, and save them back. In `index.tsx`, we use `useFocusEffect` to reload the list every time the user navigates back to the dashboard.
- **Notification Logic:** In `_layout.tsx`, `Notifications.setNotificationHandler` is configured to show alerts in the foreground. Upon saving a task, `Notifications.scheduleNotificationAsync` is triggered with `trigger: null` for an immediate alert.

## 4. How to Run the Project
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npx expo start -c` to start the Metro bundler (with cleared cache).
4. Scan the QR code using the Expo Go app on a physical device.

## 5. Output Screens
All output screenshots (including proof of the Image Picker working) are available in the `Output_Screens` folder.
