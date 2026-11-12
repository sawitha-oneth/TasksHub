import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const BG_URL =
  'https://img.magnific.com/free-vector/isometric-timemanagement-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80';
const BANNER_URL =
  'https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-taskmanagement-illustration-concept-on-white-background-vector.jpg';

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const saveTask = async () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      
      const newTask = {
        id: Date.now().toString(),
        taskName,
        taskDescription,
      };
      tasksArray.push(newTask);

      
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));

      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Saved Successfully! 📚',
          body: `Don't forget to complete your ${taskName}.`,
        },
        trigger: null, 
      });

     
      router.back();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: BG_URL }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={{ uri: BANNER_URL }} style={styles.banner} />

        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />

        <Text style={styles.label}>Task Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter task description"
          value={taskDescription}
          onChangeText={setTaskDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: { height: 110 },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
