import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';


const List = ({ navigation }) => {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => { }, []);

    const addTodo = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'todos'), { title: 'I am a test', done: false });
        console.log("addTodo ", doc);
    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Add new todo'
                onChangeText={(text) => setTodo(text)}
                value={todo}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {},
});

export default List;