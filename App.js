import React, {useCallback, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CategoryView} from "./components/budgetComponents/budgetInterfaceView";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "./components/Modal";
import createGathering from "./components/gatheringComponents/CreateGathering";
import {Login} from "./components/loginComponents/loginView";
import {ProfileView} from "./components/profileComponents/profileInterfaceView";
import { useNavigation } from '@react-navigation/native';

const App = () => {

    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    const handler = () => {
        navigation.navigate('Login');
    }

        return (
            <NavigationContainer>
                <View>
                    <Modal isVisible={true} >
                        <Modal.Container>
                            <Modal.Header title={"Sign In Please"} />
                            <Modal.Footer>
                                <Button title="Google Sign In" onPress={handler} />
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
                <Tab.Navigator>
                    <Tab.Screen name="Home"/>
                    <Tab.Screen name="Gathering" />
                    <Tab.Screen name="Profile" />
                </Tab.Navigator>
            </NavigationContainer>
        );

}

export default App;
