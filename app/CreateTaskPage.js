import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const createTask = () => {
    console.log('Task Created', { title, date, time, description });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create task</Text>
      
      <Text style={styles.label}>Title*</Text>
      <TextInput
        style={styles.input}
        placeholder="Brainstorm"
        placeholderTextColor="darkgrey"
        value={title}
        onChangeText={setTitle}
      />
      
      <View style={styles.dateTimeContainer}>
        <View style={{ flex: 2, marginRight: 10 }}>
          <Text style={styles.label}>Date*</Text>
          <View style={styles.iconInputContainer}>
            <Icon name="calendar-today" size={20} color="darkgrey" />
            <TextInput
              style={styles.textWithIconInput}
              placeholder="23.12.2023"
              placeholderTextColor="darkgrey"
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Time*</Text>
          <View style={styles.iconInputContainer}>
            <Icon name="access-time" size={20} color="darkgrey" />
            <TextInput
              style={styles.textWithIconInput}
              placeholder="14:00"
              placeholderTextColor="darkgrey"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>
      </View>

      
      <Text style={styles.label}>Description*</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Add descriptions"
        placeholderTextColor="darkgrey"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <TouchableOpacity style={styles.button} onPress={createTask}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      <Text style={styles.legend}>* Fields are mandatory</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textWithIconInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15, // Added margin here for spacing from the legend
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  legend: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10, // Spacing from the button or the last element
  },
});

export default CreateTaskPage;
