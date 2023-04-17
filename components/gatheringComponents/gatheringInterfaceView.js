import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {currentGathering} from "../global_variables";
import {Gathering} from "./Gathering";
import { useNavigation } from '@react-navigation/native';

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const GatheringInterface = () => {
    const navigation = useNavigation();
    const handlerGatheringClicked = () => {
        navigation.navigate('CurrentGathering');
    }

    return (
        <View>
            <TouchableOpacity onPress={handlerGatheringClicked}>
                <Text style={styles.text}> Gathering 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerGatheringClicked}>
                <Text style={styles.text}> Gathering 2</Text>
            </TouchableOpacity>
            <Button title={"Add"}/>
        </View>

    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            justifyContent: 'flex-start',
            backgroundColor: 'white'
        },
        head: {
            height: 44,
            backgroundColor: 'gray'
        },
        headText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'black'},
        text: {
            margin: 4,
            fontSize: 16,
            textAlign: 'center',
            backgroundColor: 'blue'
        },
        category: {
            backgroundColor: 'lightgrey',
            padding: 20
        },
        edit: {
            fontSize: 20,
            color: 'orange',
            width: '100%',
            backgroundColor: 'grey',
            textAlign: 'center'
        },
        profilePicture: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
        },
        name: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        bioContainer: {
            marginBottom: 20,
        },
        bio: {
            fontSize: 16,
            lineHeight: 24,
        },
    }
)



