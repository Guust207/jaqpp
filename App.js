import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseConfig";

import {Login} from "./components/loginComponents/loginView";
import SignInScreen  from "./components/loginComponents/signInView";
import {CategoryView} from "./components/budgetComponents/budgetInterfaceView";

const App = () => {

    const [user, setUser] = useState(null)

    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();

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

        return (
            /*
             <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="SignIn" component={SignInScreen}/>
                    <Tab.Screen name="Home" component={Login}/>
                    <Tab.Screen name="Add" component={Create}/>
                    <Tab.Screen name="Edit" component={Edit}/>
                </Tab.Navigator>
            </NavigationContainer>
            */
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="SignIn" component={SignInScreen}/>
                    <Tab.Screen name="Home" component={Login}/>
                    <Tab.Screen name="Add" component={CategoryView}/>
                </Tab.Navigator>
            </NavigationContainer>
        );

}

export default App;
