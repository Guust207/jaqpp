import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView,  TextInput,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, setDoc, where, deleteDoc, getDocs} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

//Component Imports
import Create from "./CreateGathering";
import {currentUser} from "../global_variables";
import {EditBudgetCategoryView} from "../budgetComponents/budget_categoryFieldView";



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


    useEffect(() => {
        if (isOwnerGatherings) {
            const getAllGat = async () => {
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
            getAllGat().then();
        } else {
            const getGuestGatherings = async () => {
                const w = query(collection(db, "gathering"));
                onSnapshot(w, (querySnapshot) => {
                    const  gatheringList = [];
                    querySnapshot.forEach((doc) => {
                        const { name, date, time} = doc.data();
                        //list for storing the data
                        gatheringList.push({
                            id: doc.id,
                            name,
                            date,
                            time,
                        });
                    });
                    set_gatList(gatheringList)
                });
                const list = [];
                for (let i = 0; i < gatList.length; i++) {
                    const docRef = doc(db,"gathering", gatList[i].id, "attendees", user.id);
                    const docSnap = await getDoc(docRef).then();

                    if (docSnap.exists()) {
                        const name = gatList[i].name
                        const date = gatList[i].date
                        const time = gatList[i].time
                        list.push({
                            id: gatList[i].id,
                            name,
                            date,
                            time,
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
                                            <Text style={styles.text}> 📅{item.date}</Text>
                                            <Text style={styles.text}>:{item.time}</Text>
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
        justifyContent: 'flex-start',
        backgroundColor: '#D6D5C9',
    },
    bioContainer: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    top: {
        flexDirection: 'row',
        marginBottom: -20
    },
    imageContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        borderRadius: 25,
        marginRight: 40,
    },
    bioName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    bottom: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 40,

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
    text: {
        fontSize: 16,
    },
    gatName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#0A100D',
        color: '#B9BAA3',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 57,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 20,
    },

    textModal: {
        fontSize:16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 2,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        color: '#333',
        fontSize: 16,
        marginBottom: 30,

    },
    editButton: {
        color: '#005cfc',
        fontSize: 20,
        marginRight: 20,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
    },
    cancelButton: {
        color: '#FF0400',
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
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

});


/*
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
 */
