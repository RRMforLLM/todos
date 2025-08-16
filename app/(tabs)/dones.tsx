import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import { Text, View } from '@/components/Themed';
import { initDatabase } from '@/database/migrations'
import { getDones, deleteDone, deleteTodo } from '@/database/services'

export default function TabTwoScreen() {
  // CONSTANTS
  const [dones, setDones] = useState<unknown[] | null>(null);

  // EFFECTS
  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedDones = await getDones();
      setDones(fetchedDones);
    };
    setup();
  }, []);

  // FUNCTIONS
  const removeDone = async (id: number) => {
    try {
      await deleteDone({ id: id });
    } catch(error) {
      console.error('Error undoing done:', error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo({ id: id });
    } catch(error) {
      console.error('Error deleting todo:', error);
    }
  };

  // RENDERING
  if (dones === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (dones.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No dones</Text>
      </View>
    );
  }

  if (dones.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dones</Text>
      </View>
    );
  }
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
