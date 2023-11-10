import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        // Initially visible month. Default = Date()
        current={Date()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => { console.log('selected day', day) }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => { console.log('month changed', month) }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If firstDay=1 week starts from Monday.
        firstDay={1}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Do not allow selection of dates before today. Default = false
        minDate={Date()}
      />
    </View>
  );
};

export default CalendarPage;
