import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import {
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { Agenda } from 'react-native-calendars';


const CalendarPage = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    if (user && selectedDate) {
      const todoRef = collection(
        FIRESTORE_DB,
        `todos/${user.uid}/dates/${selectedDate}/tasks`
      );
      const subscriber = onSnapshot(todoRef, {
        next: (snapshot) => {
          const newTodos = [];
          snapshot.docs.forEach((doc) => {
            newTodos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setTodos(newTodos);
        },
      });
      return () => subscriber();
    }
  }, [selectedDate]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);


  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  const navigateToCreateToDo = (item) => {
    navigation.navigate('CreateToDo', { date: selectedDate, todoItem: item });
  };


  const renderItem = (item) => {
  return (
    <TouchableOpacity onPress={() => navigateToCreateToDo(item)} style={styles.todoContainer}>
      <View style={styles.todo}>
        <Text style={[
          styles.todoText,
          { textDecorationLine: item.done ? 'line-through' : 'none', color: item.done ? '#2ecc71' : '#3498db' }
        ]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Agenda</Text>
      </View>
      <Agenda
        items={{
          [selectedDate]: todos.map((item) => ({
            title: item.title,
            done: item.done,
          })),
        }}
        renderItem={renderItem}
        onDayPress={onDayPress}
      />
      <View style={styles.buttonContainer}>
          <Button
            title="Create To Do"
            onPress={navigateToCreateToDo}
            color="#5E60CE"
          />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#5E60CE',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  keyboardAwareScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  todoSection: {
    margin: 10,
  },
  todoList: {
    flexGrow: 1,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noTodosText: {
    textAlign: 'center',
    color: '#2c3e50',
    marginTop: 20,
    fontSize: 16,
  },
});

export default CalendarPage;