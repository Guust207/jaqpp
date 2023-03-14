import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {login} from "./components/loginView";
import Create from "./components/CreateGathering";
import EditView from "./components/editView";

const App = () => {
    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={login}/>
                <Tab.Screen name="Add" component={Create}/>
                <Tab.Screen name="Edit" component={EditView}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
