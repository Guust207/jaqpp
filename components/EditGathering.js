//View all students and information function
import {collection, doc, getDoc, query, onSnapshot, setDoc, where, deleteDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../firebaseConfig";
import React, {useEffect, useState} from "react";
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';



//Component Imports
import {Modal} from "./Modal";
import {userss} from "./loginView";


const Edit = () => {

    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const user = auth.currentUser;


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


    //Edit part
    //Variables and functions that handles the edit part
    const [id, set_id] = useState(id);
    const [Name, set_Name] = useState(Name);
    const [Date, set_Date] = useState(Date);
    const [Time, set_Time] = useState(Time);



    //Function for editing a gathering
    async function edit(id, gatName, gatTime, gatDate) {
        await setDoc(doc(db, "gathering", id), {
                name: gatName,
                time: gatTime,
                date: gatDate,
                userID: user.uid,
            }
        );
    }



    //This is  the Edit function for the Edit button located at the Home in the app
    //Its main responsibility is getting the documentID of the column selected, then fetching the edited variables.
    const EditBtnFunc = (gat) => {
            set_id(gat.id);
            set_Name(gat.name);
            set_Date(gat.date);
            set_Time(gat.time);
            handleModal();
    }

    async function check(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            edit(id, Name, Date, Time).then();
            handleModal();
        }
    }


    //Using this will check the id and then edit the data.
    const editData = () => {
        check("gathering", id).then();
    }

    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible)

    };



    //Delete part
    async function checkDel(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            del("gathering", id).then();
            console.log('DELETED the document');

        }
    }
    async function del(collection, id) {
        await deleteDoc(doc(db, collection, id));
    }

    const deleteData = () => {
        checkDel("gathering", id).then();
    }




    //This is the view that you will see at Home in app
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bioContainer}>
                    <View style={styles.top}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.logo} source={require('../images/logo.png')} />
                            {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
                        </View>
                        <Text style={styles.bioName}>{user.email}</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bio}>Hello! I'm ChatGPT, an AI language model created by OpenAI. I use deep learning to generate human-like responses to various prompts and questions. Let me know how I can help you!</Text>
                    </View>
                </View>

                <View>
                    {gat.map((item) => (
                        <View key={item.id} style={styles.gatContainer}>
                            <View style={styles.gat}>
                                <View style={styles.infoContainer}>
                                    <Text style={[styles.text, styles.gatName]}> {item.name}</Text>
                                    <Text style={styles.text}> Date: {item.date}</Text>
                                    <Text style={styles.text}> Time: {item.time}</Text>

                                </View>
                                <TouchableOpacity onPress={() => EditBtnFunc(item)}>
                                    <Text style={styles.editButton}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteData(item)}>
                                    <Text style={styles.editButton}>Delete</Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                    ))}



                    {/* This is the popup that appears when you click edit at the table */}
                    <Modal isVisible={isModalVisible} >
                        <Modal.Container>
                            <Modal.Header title="Edit" />
                            <Modal.Body>
                                <Text>New name for gathering:</Text>
                                <TextInput
                                    onChangeText={set_Name}
                                    value={Name}
                                    placeholder='Name'
                                />

                                <Text>Date:</Text>
                                <TextInput
                                    onChangeText={set_Date}
                                    value={Date}
                                    placeholder='Date'
                                />

                                <Text>Time:</Text>
                                <TextInput
                                    onChangeText={set_Time}
                                    value={Time}
                                    placeholder='Time'
                                />

                                <Button
                                    onPress={editData}
                                    title="Edit"
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button title="Cancel" onPress={handleModal} />
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    )
}


export default Edit;



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
        height: 100,
        width: 100,
        borderRadius: 50,
        marginRight: 40,
    },
    logo: {
        aspectRatio: 1,
        marginTop: '-30%',
        marginBottom: -70,
        resizeMode: 'contain',
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
    },
    bio: {
        marginLeft: 8,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },


    gatContainer: {
        backgroundColor: '#B9BAA3',
        padding: 20
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    infoContainer: {
        flex: 1,
    },
    text: {
        margin: 4,
        fontSize: 16,
    },
    gatName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

    editButton: {
        flex: 1,
        fontSize: 20,
        color: '#B9BAA3',
        backgroundColor: '#0A100D',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        paddingVertical: 30,
        paddingHorizontal: 10,

    },

});

