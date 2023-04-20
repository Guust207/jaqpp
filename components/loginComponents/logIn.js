import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SignInScreen from "./signInView";
import RegisterInScreen from "./registerView";


/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const LogIn = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
            <Stack.Screen name="register" component={RegisterInScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}
