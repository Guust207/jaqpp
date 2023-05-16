import {Button, Text, View, ScrollView,  TextInput,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, query, onSnapshot, setDoc, getDocs, where, deleteDoc} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import {Modal} from "../Modal";
import uuid from 'react-native-uuid';


//Component Imports
import {styles} from "../Styles";
import {Buttons} from "../Button";
import {FontAwesome} from "@expo/vector-icons";

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const ShowGuests = ({route}) => {
    const navigation = useNavigation();

    const [attendeeEmail, set_attendeeEmail] = useState("email");
    const { gathering , user} = route.params;
    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [gatheringName, set_gatheringName] = useState(gathering.name);

    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);



    useEffect((user) => {
        const getAllGat = async () => {
            const q = query(collection(db, "gathering", gatheringID, "attendees"));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const { email, fullName, image } = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        email,
                        fullName,
                        image,
                    });
                });

                setGat(list);
            });
        }
        getAllGat().then();

    },[user])



    //Variables used to handle Modal (Popup screen for edit)




    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.attendees}>
                        <Text style={styles.attendeesText}>Members for this gathering</Text>
                        {gat.map((item) => (
                            <View key={item.id} style={styles.gatContainer}>
                                {/* i toppen skriv route og i toippen på denne skriv navigation
                                const drink = route.params.drink*/}
                                <View style={[styles.gat, styles.attendeesCont]}>
                                    <View style={styles.attendeesImageContainer}>
                                        <Image style={styles.profilePicture} source={{ uri: item.image }} />
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.attendeesName}>{item.fullName}</Text>
                                        <Text>{item.email}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}



