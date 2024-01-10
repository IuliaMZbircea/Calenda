import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { FlatList, TextInput} from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

const List = ({}) => {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                
                const todos = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setTodos(todos);
            },
        });
        return () => subscriber();
     }, []);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false });
        setTodo = '';
    };
    
    const renderTodo = ({item}) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}` )

        const toggleDone = async() => {
            updateDoc(ref, { done: !item.done});

        }

        const deleteItem = async() => {
            deleteDoc(ref);
            
        }
        return (
            <View style={styles.todoContainer}>
               <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                {item.done && <Ionicons name="checkmark-circle-outline" size={32} color="green" />}
                {!item.done && <Entypo name="circle" size={32} color="black" />}

                <Text style={styles.todoText}>{item.title}</Text>
               </TouchableOpacity>
               <Ionicons name="trash-bin-outline" size={24} color="red" on onPress={deleteItem} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style = {styles.form}>
            <TextInput style = {styles.input} placeholder = 'Add new todo' onChangeText={(text) => setTodo(text)} value={todo}/>
            <Button onPress={addTodo} title = 'Add Todo' disabled = {todo === ''}/>
            </View>
            { todos.length > 0 && (
                <View>
                <FlatList
                data={todos}
                renderItem={(item) => renderTodo(item)}
                keyExtractor={(todo) => todo.id}/>

             </View>
            )}
            
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
    },
    todoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        padding: 10,
        marginVertical: 4,
    },
    todoText: {
        flex:1,
        paddingHorizontal: 4

    },
    todo:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default List;