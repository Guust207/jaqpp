import {Button, StyleSheet, Text, View} from "react-native";
import signInView from "../loginComponents/signInView";
import React from "react";
import {GatheringInterface} from "./gatheringInterfaceView";
import {createStackNavigator} from "@react-navigation/stack";
import {currentCategory, currentField, currentGathering, currentGatheringHeader} from "../global_variables";
import {GatheringView} from "./GatheringView";
import Create from "./CreateGathering";
import {CategoryView} from "../budgetComponents/budgetInterfaceView";
import {FieldView} from "../budgetComponents/fielsInterfaceView";
import {AttendeesInterface} from "../attendeesComponents/attendeesnterfaceView";
import {AttendeesGatheringView} from "./AttendeesGatheringView";

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const Gathering = () => {
    const [CurrentGathering, setCurrentGathering] = currentGathering();
    const [CurrentCategory, setCurrentCategory] = currentCategory();
    const [CurrentGatheringHeader, setCurrentGatheringHeader] = currentGatheringHeader();

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Your gatherings" component={GatheringInterface}
                          options={{
                              title: CurrentGatheringHeader,
                          }}
            />
            <Stack.Screen name="Create" component={Create}/>
            <Stack.Screen name="Attendees" component={AttendeesInterface}/>
            <Stack.Screen name="CurrentGathering" component={GatheringView}
                          options={{
                              title: CurrentGathering.name,
                          }}
            />
            <Stack.Screen name="CurrentAttendeesGathering" component={AttendeesGatheringView}
                          options={{
                              title: CurrentGathering.name,
                          }}
            />
            <Stack.Screen name="Budget" component={CategoryView}/>
            <Stack.Screen name="Field" component={FieldView}
                          options={{
                              title: CurrentCategory.name,
                          }}
            />
        </Stack.Navigator>
    )
}
