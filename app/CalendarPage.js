import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { onSnapshot, collection } from 'firebase/firestore';

const CalendarPage = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const onDayPress = (day) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
  };

  const navigateToCreateToDo = () => {
    navigation.navigate('CreateToDo', { date: selectedDate, todos: tasks });
  };
  

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;

    const fetchTasks = async () => {
      if (user && selectedDate) {
        const todoRef = collection(FIRESTORE_DB, `todos/${user.uid}/dates/${selectedDate}/tasks`);

        const subscriber = onSnapshot(todoRef, {
          next: (snapshot) => {
            const tasks = [];
            snapshot.docs.forEach((doc) => {
              tasks.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setTasks(tasks);
          },
        });

        return () => subscriber();
      }
    };

    fetchTasks();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Calendar
        current={new Date()}
        onDayPress={onDayPress}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => console.log('month changed', month)}
        hideArrows={false}
        hideExtraDays={true}
        firstDay={1}
        showWeekNumbers={false}
        minDate={new Date().toISOString().split('T')[0]}
        theme={calendarTheme}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#5E60CE' },
        }}
      />
      {selectedDate && (
        <View style={styles.buttonContainer}>
          <Button
            title="Create To Do List"
            onPress={navigateToCreateToDo}
            color="#5E60CE"
          />
          {/* <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate}
          </Text> */}
          {tasks.length > 0 && (
            <Text style={styles.tasksText}>Tasks: {tasks.map((task) => task.title).join(', ')}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  buttonContainer: {
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  selectedDateText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
  },
  tasksText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
});



const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#5E60CE',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#5E60CE',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#5E60CE',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  monthTextColor: 'blue',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16
};

export default CalendarPage;
