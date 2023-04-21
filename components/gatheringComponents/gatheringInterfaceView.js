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
    const user = auth.currentUser;
    const [GoogleUser, setUser] = currentUser();

    useEffect(() => {
        const getAllGat = async () => {


            if (user !== null) {
                const uid = user.uid;
                console.log("  Provider-specific UID: " + uid);


                const q = query(collection(db, "gathering"), where("userID", "==", uid));
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
        getAllGat();

    },[])



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
                                        <Image style={styles.gatImage} source={require('../../images/tiger_bakgrun.jpg')} />
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

                    <Button onPress={() => navigation.navigate('Create')}
                    title={"Add"}/>
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
        borderRadius: 50,
        marginRight: 40,
    },
    logo: {
        aspectRatio: 1,
        marginLeft: 8,
        width: '100%',
        height: undefined,
        borderRadius: 50,
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
        borderRadius: '10%',
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gatImageContainer: {
        width: 80,
        borderRadius: 50,
        marginRight: 10,
        marginBottom: 10,
    },
    gatImage: {
        aspectRatio: 1,
        width: 80,
        height: undefined,
        borderRadius: 50,
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


