import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';


const List = ({}) => {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => { }, []);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false });
        setTodo = '';
    };
    return (
        <View style={styles.container}>
            <View style = {styles.form}>
            <TextInput style = {styles.input} placeholder = 'Add new todo' onChangeText={(text) => setTodo(text)} value={todo}/>
            <Button onPress={addTodo} title = 'Add Todo' disabled = {todo === ''}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,

    },
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input:{
        flex: 1,
        height: 40,
        borderWidth:1,
        borderRadius: 3,
        padding: 10,
        backgroundColor: '#fff',
    }
});

export default List;