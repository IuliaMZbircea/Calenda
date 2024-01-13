import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import {
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
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
    // Disable the header for this screen
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);


  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  const navigateToCreateToDo = () => {
    navigation.navigate('CreateToDo', { date: selectedDate });
  };

  const addTodo = async () => {
    if (!user || !selectedDate || !todo) {
      return; // Validation
    }

    const todoRef = collection(
      FIRESTORE_DB,
      `todos/${user.uid}/dates/${selectedDate}/tasks`
    );
    await addDoc(todoRef, { title: todo, done: false });
    setTodo('');
  };

  const renderTodo = ({ item }) => {
    const ref = doc(
      FIRESTORE_DB,
      `todos/${user.uid}/dates/${selectedDate}/tasks/${item.id}`
    );

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done ? (
            <Ionicons name="checkmark-done" size={24} color="#2ecc71" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#3498db" />
          )}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Ionicons name="trash-bin-outline" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => console.log(item)} style={styles.todo}>
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
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

      {/* <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {selectedDate && (
          <View style={styles.todoSection}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Add new todo"
                onChangeText={(text) => setTodo(text)}
                value={todo}
              />
              <Button
                onPress={addTodo}
                title="Add"
                disabled={todo === ''}
              />
            </View>
            {todos.length === 0 && (
              <Text style={styles.noTodosText}>No todos for this day</Text>
            )}
            <FlatList
              data={todos}
              renderItem={renderTodo}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.todoList}
            />
          </View>
        )}
      </KeyboardAwareScrollView> */}
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