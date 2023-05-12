import {Text, TouchableOpacity, View, ScrollView,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, where} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

//Component Imports
import {currentUser} from "../global_variables";
import  {styles} from "../Styles";

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const GatheringInterface = () => {
    const navigation = useNavigation();

    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const [gatList, set_gatList] = useState([]);
    const [user, setUser] = currentUser();

    const [isOwnerGatherings, Switch] = useState(true);
    const [currentFilter, SwitchFilter] = useState("Created Gatherings");

    //Gather
    useEffect(() => {
        const getAllGat = async () => {
            const w = query(collection(db, "gathering"));
            onSnapshot(w, (querySnapshot) => {
                const gatheringList = [];

                querySnapshot.forEach((doc) => {
                    const {name, date, time, description} = doc.data();

                    //list for storing the data
                    gatheringList.push({
                        id: doc.id,
                        name,
                        date,
                        time,
                        description,
                    });
                });
                set_gatList(gatheringList);
            });
        }
        getAllGat()
    },[user])

    useEffect(() => {
        if (isOwnerGatherings) {
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
            getAllGat().then();
        } else {
            const getGuestGatherings = async () => {
                const list = [];
                for (let i = 0; i < gatList.length; i++) {
                    const docRef = doc(db,"gathering", gatList[i].id, "attendees", user.id);
                    const docSnap = await getDoc(docRef).then();
                    if (docSnap.exists()) {
                        const name = gatList[i].name
                        const date = gatList[i].date
                        const time = gatList[i].time
                        const description = gatList[i].description
                        list.push({
                            id: gatList[i].id,
                            name,
                            date,
                            time,
                            description,
                        });
                    }
                }
                setGat(list);
            }
            getGuestGatherings().then();
        }
    },[user, isOwnerGatherings])

    const switchHandler = () => {
        Switch(() => !isOwnerGatherings)
        if (isOwnerGatherings)
            SwitchFilter("Guest Gatherings")
        else
            SwitchFilter("Created Gatherings")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={switchHandler}>
                <Text> Switch Owner/Guest - {currentFilter}</Text>
            </TouchableOpacity>
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


