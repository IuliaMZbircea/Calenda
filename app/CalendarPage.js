import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CalendarPage = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (day) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
  };

  const navigateToCreateTask = () => {
    // Navigate to CreateTaskPage when the button is pressed
    navigation.navigate('CreateTaskPage');
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={Date()}
        onDayPress={onDayPress}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => { console.log('month changed', month) }}
        hideArrows={false}
        hideExtraDays={true}
        firstDay={1}
        showWeekNumbers={true}
        minDate={Date()}
      />
      {selectedDate && (
        <Button
          title="Create Task"
          onPress={navigateToCreateTask}
        />
      )}
    </View>
  );
};

export default CalendarPage;
