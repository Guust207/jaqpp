import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView,  TextInput,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, setDoc, where, deleteDoc} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

//Component Imports
import Create from "./CreateGathering";
import {currentUser} from "../global_variables";



/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const GatheringInterface = () => {
    const navigation = useNavigation();



    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const [user, setUser] = currentUser();



    useEffect(() => {
        const getAllGat = async () => {
            const q = query(collection(db, "gathering"), where("userID", "==", user.id));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const { name, date, time, description} = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        name,
                        date,
                        time,
                        description,
                    });
                });

                setGat(list);
            });
        }
        getAllGat();

    },[user])

    const getGatheringsForUser = async () => {
        if (user !== null) {


            const q = query(collection(db, "gathering"), where("userID", "==", user.id));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const { name, date, time} = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        name,
                        date,
                        time,

                    });
                });

                setGat(list);
            });
        }
    }



    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    {gat.map((item) => (
                        <View key={item.id} style={styles.gatContainer}>
                            {/* i toppen skriv route og i toippen på denne skriv navigation
                            const drink = route.params.drink*/}
                            <TouchableOpacity onPress={() => navigation.navigate('CurrentGathering', { item })}>
                                <View style={styles.gat}>
                                    <View style={styles.gatImageContainer}>
                                        <Image style={styles.gatImage}/>
                                        {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={[styles.text, styles.gatName]}> {item.name}</Text>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.infoText}> 📅{item.date}</Text>
                                            <Text style={styles.infoText}>:{item.time}</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <View style={styles.gat}>

                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}







//Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9',
    },

    gatContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        margin:10,
        borderRadius: 25,
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gatImageContainer: {
        width: 80,
        borderRadius: 25,
        marginRight: 10,
        marginBottom: 10,
    },
    gatImage: {
        aspectRatio: 1,
        width: 80,
        height: undefined,
        borderRadius: 25,
    },
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        flex: 1,
    },
    infoText: {
        fontSize: 16,
    },
    gatName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },


});


