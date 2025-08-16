import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { initDatabase } from '@/database/migrations'
import { getTodos, getDones } from '@/database/services'

export default function TabOneScreen() {
  // CONSTANTS
  const [todos, setTodos] = useState<unknown[] | null>(null);
  const [dones, setDones] = useState<unknown[] | null>(null);
  const [todoSubject, setTodoSubject] = useState('');
  const [todoDetails, setTodoDetails] = useState('');
  const [todoDeadline, setTodoDeadline] = useState(new Date().toISOString().split('T')[0]);

  // EFFECTS
  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
      const fetchedDones = await getDones();
      setDones(fetchedDones);
    };
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
