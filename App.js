import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseConfig";

import {Login} from "./components/loginView";
import Create from "./components/CreateGathering";
import Edit from "./components/EditGathering";
import SignInScreen  from "./components/signInView";
import {BudgetView} from "./components/budgetComponents/budgetView";
import {budgetCategoryView} from "./components/budgetComponents/budget_categoryFieldView";

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
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="SignIn" component={SignInScreen}/>
                    <Tab.Screen name="Home" component={Login}/>
                    <Tab.Screen name="Add" component={Create}/>
                    <Tab.Screen name="Edit" component={Edit}/>
                </Tab.Navigator>
            </NavigationContainer>
        );

}

export default App;
