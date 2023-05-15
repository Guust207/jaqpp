import {Text, TouchableOpacity, View, ScrollView,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, where} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

//Component Imports
import {currentFilter, currentGatheringHeader, currentUser} from "../global_variables";
import  {styles} from "../Styles";
import {Entypo} from "@expo/vector-icons";


export const GatheringInterface = () => {
    const navigation = useNavigation();

    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const [gatList, set_gatList] = useState([]);
    const [isOwnerGatherings, Switch] = useState(true);
    const [currentFilters, SwitchFilter] = currentFilter();
    const [user, setUser] = currentUser();
    const [CurrentGatheringHeader, setCurrentGatheringHeader] = currentGatheringHeader();



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
        if (isOwnerGatherings){
            SwitchFilter("Guest Gatherings")
            setCurrentGatheringHeader('Gatherings you are invited to')
        }
        else {
            SwitchFilter("Created Gatherings")
            setCurrentGatheringHeader('Gathering you have created')
        }
    }

    if(currentFilters === "Created Gatherings") {
        return (
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity onPress={switchHandler} style={styles.buttonContainer}>
                        <Entypo
                            style={styles.icon}
                            name="sound-mix"
                            size={18}
                            color='black'
                        />
                        <Text style={styles.selectedTextStyle}> Filter - {currentFilters}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        {gat.map((item) => (
                            <View key={item.id} style={styles.gatContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('CurrentGathering', { item })}>
                                    <View style={styles.gat}>
                                        <View style={styles.gatImageContainer}>
                                            <Image style={styles.gatImage} source={require('../../images/tiger_bakgrun.jpg')} />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={[styles.text, styles.gatName]}>{item.name}</Text>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.infoText}>📅{item.date}</Text>
                                                <Text style={styles.infoText}>:{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity onPress={switchHandler} style={styles.buttonContainer}>
                        <Entypo
                            style={styles.icon}
                            name="sound-mix"
                            size={18}
                            color='balck'
                        />
                        <Text style={styles.selectedTextStyle}> Filter - {currentFilters}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        {gat.map((item) => (
                            <View key={item.id} style={styles.gatContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('CurrentAttendeesGathering', { item })}>
                                    <View style={styles.gat}>
                                        <View style={styles.gatImageContainer}>
                                            <Image style={styles.gatImage} source={require('../../images/logo_2.png')} />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={[styles.text, styles.gatName]}>{item.name}</Text>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.infoText}>📅{item.date}</Text>
                                                <Text style={styles.infoText}>:{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}


