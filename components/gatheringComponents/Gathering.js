import {Button, StyleSheet, Text, View} from "react-native";
import signInView from "../loginComponents/signInView";
import React from "react";
import {GatheringInterface} from "./gatheringInterfaceView";
import {createStackNavigator} from "@react-navigation/stack";
import {currentGathering} from "../global_variables";
import {GatheringView} from "./GatheringView";
import Create from "./CreateGathering";
import {CategoryView} from "../budgetComponents/budgetInterfaceView";

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const Gathering = () => {
    const [CurrentGathering, setCurrentGathering] = currentGathering();
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Your gatherings" component={GatheringInterface}/>
            <Stack.Screen name="Create" component={Create}/>
            <Stack.Screen name="CurrentGathering" component={GatheringView}
                          options={{
                              title: CurrentGathering.name,
                          }}
            />
            <Stack.Screen name="Budget" component={CategoryView}/>
        </Stack.Navigator>
    )
}
