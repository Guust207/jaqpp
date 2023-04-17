import React, {useCallback, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "./components/Modal";
import signInView from "./components/loginComponents/signInView";
import {Gathering} from "./components/gatheringComponents/Gathering";
import {ProfileView} from "./components/profileComponents/profileInterfaceView";
import {currentGathering} from "./components/global_variables";

const App = () => {

    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const [CurrentGathering, setCurrentGathering] = currentGathering();


    const handler = () => {
        setCurrentGathering("gathering12324")
    }
    return (
        <NavigationContainer>
            <View>
                <Modal isVisible={false} >
                    <Modal.Container>
                        <Modal.Header title={"Sign In Please"} />
                        <Modal.Footer>
                            <Button title="Google Sign In" onPress={handler} />
                        </Modal.Footer>
                    </Modal.Container>
                </Modal>
            </View>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={signInView}/>
                <Tab.Screen name="Gatherings" component={Gathering}/>
                <Tab.Screen name="Profile" component={ProfileView}/>
            </Tab.Navigator>
        </NavigationContainer>
    );

}

export default App;
