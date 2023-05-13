import React from "react";
import {GatheringInterface} from "./gatheringInterfaceView";
import {createStackNavigator} from "@react-navigation/stack";
import {currentCategory, currentFilter, currentGathering} from "../global_variables";
import {GatheringView} from "./GatheringView";
import {CategoryView} from "../budgetComponents/budgetInterfaceView";
import {FieldView} from "../budgetComponents/fielsInterfaceView";
import {AttendeesInterface} from "../attendeesComponents/attendeesnterfaceView";
import {AttendeesGatheringInterface} from "./attendeesInterfaceGateringView";
import {AttendeesGatheringView} from "./AttendeesGatheringView";




export const Gathering = () => {
    const [CurrentGathering, setCurrentGathering] = currentGathering();
    const [CurrentCategory, setCurrentCategory] = currentCategory();
    const [filter, setFilter] = currentFilter();

    const Stack = createStackNavigator();

    if (filter == "Guest Gatherings") {

        return (
            <Stack.Navigator>
                <Stack.Screen name="Your attendees gatherings" component={AttendeesGatheringInterface} />
                <Stack.Screen name="CurrentAttendeesGathering" component={AttendeesGatheringView}
                              options={{
                                  title: CurrentGathering.name,
                              }}
                />
            </Stack.Navigator>
        )
    } else if(filter == "Own Gatherings") {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Your gatherings" component={GatheringInterface} />
                <Stack.Screen name="CurrentGathering" component={GatheringView}
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
                <Stack.Screen name="Attendees" component={AttendeesInterface}/>
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Your attendees gatherings" component={AttendeesGatheringInterface} />
                <Stack.Screen name="CurrentAttendeesGathering" component={AttendeesGatheringView}
                              options={{
                                  title: CurrentGathering.name,
                              }}
                />
            </Stack.Navigator>
        )
    }
}
