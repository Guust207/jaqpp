import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { currentUser } from "./components/global_variables";
import { Login } from "./components/loginComponents/loginView";
import { Gathering } from "./components/gatheringComponents/Gathering";
import { ProfileView } from "./components/profileComponents/profileInterfaceView";
import Create from "./components/gatheringComponents/CreateGathering";
import 'expo-dev-client'

const App = () => {
    const [user, setUser] = currentUser();
    const Tab = createBottomTabNavigator();



    if (user === null) {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="SignIn"
                        component={Login}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="login" size={24} color="black" />
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
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="home" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Create"
                        component={Create}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="duplicate-outline" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileView}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" size={24} color="black" />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
};

export default App;
