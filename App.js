import { StyleSheet, } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Login} from "./components/loginView";
import Create from "./components/CreateGathering";
import Edit from "./components/EditGathering";
import Users from "./components/getView";

import SignInScreen  from "./components/signInView";


const App = () => {
    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="SignIn" component={SignInScreen}/>
                <Tab.Screen name="Home" component={Login}/>
                <Tab.Screen name="Add" component={Create}/>
                <Tab.Screen name="Edit" component={Edit}/>
                <Tab.Screen name="User" component={Users}/>
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
