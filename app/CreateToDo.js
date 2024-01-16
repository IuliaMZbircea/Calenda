import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text, TextInput, FlatList } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const List = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const user = FIREBASE_AUTH.currentUser;
    const selectedDate = route.params?.date || null;

    useEffect(() => {
        if (user && selectedDate) {
            const todoRef = collection(FIRESTORE_DB, `todos/${user.uid}/dates/${selectedDate}/tasks`);
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
    }, []);

    const handleLogout = async () => {
        await FIREBASE_AUTH.signOut();
        navigation.navigate('LoginPage');
    };

    const addTodo = async () => {
        if (!user || !selectedDate || !todo) {
            return;
        }

        const todoRef = collection(FIRESTORE_DB, `todos/${user.uid}/dates/${selectedDate}/tasks`);
        await addDoc(todoRef, { title: todo, done: false });
        setTodo('');
    };

    const renderTodo = ({ item }) => {
        const ref = doc(FIRESTORE_DB, `todos/${user.uid}/dates/${selectedDate}/tasks/${item.id}`);

        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done });
        
        };

        const deleteItem = async () => {
            deleteDoc(ref);
        };

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <Ionicons name="checkmark-circle-outline" size={32} color="green" />}
                    {!item.done && <Entypo name="circle" size={32} color="black" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new todo"
                    onChangeText={(text) => setTodo(text)}
                    value={todo}
                />
                <Button onPress={addTodo} title="Add Todo" disabled={todo === ''} />
            </View>
            {todos.length > 0 && (
                <FlatList 
                    data={todos} 
                    renderItem={renderTodo} 
                    keyExtractor={(item) => item.id} 
                />
            )}
            <View style={styles.logoutButtonContainer}>
                <Button onPress={handleLogout} title="Log out" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 20,
        backgroundColor: '#F0F4F8',
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
        borderRadius: 3,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        padding: 10,
        marginVertical: 4,
    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutButton: {
        marginBottom: 10,
    },
    logoutButtonContainer: {
        marginBottom: 30, 
        paddingHorizontal: 20, 
    },
});

export default List;
