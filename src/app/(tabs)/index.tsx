import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BG_URL =
  'https://img.magnific.com/free-vector/isometric-timemanagement-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80';

type Task = {
  id: string;
  taskName: string;
  taskDescription: string;
};

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      setTasks(storedTasks ? JSON.parse(storedTasks) : []);
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

 
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <ImageBackground source={{ uri: BG_URL }} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Your Tasks</Text>

        <ScrollView style={styles.list}>
          {tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks saved yet. Add one!</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.taskName}>{task.taskName}</Text>
                <Text>{task.taskDescription}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-task')}
        >
          <Text style={styles.addButtonText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 16, backgroundColor: 'rgba(255,255,255,0.8)' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  list: { flex: 1 },
  empty: { fontStyle: 'italic', color: '#666', textAlign: 'center', marginTop: 30 },
  taskCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  taskName: { fontSize: 16, fontWeight: 'bold', color: 'blue', marginBottom: 4 },
  addButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
