import React from 'react';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Text, View, Todo } from '@/components/Themed';
import { initDatabase } from '@/database/migrations'
import { getDones, deleteDone, deleteTodo } from '@/database/services'

export default function TabTwoScreen() {
  // CONSTANTS
  const [dones, setDones] = useState<unknown[] | null>(null);

  // EFFECTS
  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        await initDatabase();
        const fetchedDones = await getDones();
        setDones(fetchedDones);
      };
      setup();
    }, [])
  );

  // FUNCTIONS
  const removeDone = async (id: number) => {
    try {
      await deleteDone({ id: id });
      const fetchedDones = await getDones();
      setDones(fetchedDones);
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
        <View style={styles.subcontainer}>
          {dones.map((done: any) => (
            <Todo
              key={done.id}
              subject={done.todo.subject}
              details={done.todo.details}
              deadline={done.todo.deadline}
              onLongPress={() => removeDone(done.id)}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
  },
  scrollcontainer: {
    flex:1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
  },
  subcontainer: {
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
