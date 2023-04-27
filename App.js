import React, {useCallback, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "./components/Modal";
import {Gathering} from "./components/gatheringComponents/Gathering";
import {ProfileView} from "./components/profileComponents/profileInterfaceView";
import {currentUser} from "./components/global_variables";
import {db} from "./firebaseConfig";
import {doc, getDoc, setDoc} from "firebase/firestore";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import Create from "./components/gatheringComponents/CreateGathering";


import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';



import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseConfig";
import {Login} from "./components/loginComponents/loginView";





const App = () => {

    const [user, setUser] = currentUser();


    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                navigator.reset({
                    index: 0,
                    routes: [{ name: 'signInView' }],
                });

            }
        });

    }, []);


    if (user == null) {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="SignIn"
                        component={Login}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="login" size={24}login color="black" />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        component={Gathering}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="home" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Create"
                        component={Create}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="duplicate-outline" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileView}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" size={24} color="black" />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}






export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6D5C9',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        color: '#333',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#0A100D',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        flex: 1,
        marginHorizontal: 5,
    },
    signInButton: {
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
    signInButtonText: {

    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginTop20: 20,
        alignItems: 'center',

    },
    googleButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#333',
    },
    googleButton: {
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#D6D5C9',
    },
    space: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop20: 10,
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        marginTop: '-40%',
        marginBottom: -70,
        resizeMode: 'center',

    },
    welcomeMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        fontSize: 18,
        marginBottom: 30,
    },

});



