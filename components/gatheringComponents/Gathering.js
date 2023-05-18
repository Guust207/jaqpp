import React from "react";
import {GatheringInterface} from "./gatheringInterfaceView";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {currentCategory, currentGathering, currentGatheringHeader} from "../global_variables";
import {GatheringView} from "./GatheringView";
import Create from "./CreateGathering";
import {CategoryView} from "../budgetComponents/budgetInterfaceView";
import {FieldView} from "../budgetComponents/fielsInterfaceView";
import {AttendeesInterface} from "../attendeesComponents/attendeesnterfaceView";
import {AttendeesGatheringView} from "./AttendeesGatheringView";
import {ShowGuests} from "../attendeesComponents/ShowGuests"


export const Gathering = () => {
    const [CurrentGathering, setCurrentGathering] = currentGathering();
    const [CurrentCategory, setCurrentCategory] = currentCategory();
    const [CurrentGatheringHeader, setCurrentGatheringHeader] = currentGatheringHeader();

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Your gatherings" component={GatheringInterface}
                          options={{
                              title: CurrentGatheringHeader,
                          }}
            />
            <Stack.Screen name="Create" component={Create}/>
            <Stack.Screen name="Attendees" component={AttendeesInterface}/>
            <Stack.Screen name="Guests" component={ShowGuests}/>
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
