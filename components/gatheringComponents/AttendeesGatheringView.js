import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {currentGathering, currentUser} from "../global_variables";
import { useNavigation } from '@react-navigation/native';

export const AttendeesGatheringView = ({route}) => {

    const [CurrentGathering, setCurrentGathering] = currentGathering();


    const navigation = useNavigation();
    const { item } = route.params;
    const [user, setUser] = currentUser();

    useEffect(() => {
        setCurrentGathering(item)
    }, [item]); // Pass user and isInitialized as dependency array

    //Edit part
    //Variables and functions that handles the edit part
    const [id, set_id] = useState(item.id);
    const [Name, set_Name] = useState(Name);
    const [Date, set_Date] = useState(Date);
    const [Time, set_Time] = useState(Time);
    const [Description, set_Description] = useState(Description);

    
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.headText}>{item.name}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                </View>
            </ScrollView>
        </View>

    )
}