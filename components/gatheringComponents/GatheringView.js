import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {currentGathering, currentUser} from "../global_variables";
import { useNavigation } from '@react-navigation/native';
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";


import {Modal} from "../Modal";


export const GatheringView = ({route}) => {

    const navigation = useNavigation();

    const { item } = route.params;

    const [CurrentGathering, setCurrentGathering] = currentGathering();
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



    //Function for editing a gathering
    async function edit(id, gatName, gatDate, gatTime, gatDescription) {
        await setDoc(doc(db, "gathering", id), {
                name: gatName,
                date: gatDate,
                time: gatTime,
                description: gatDescription,
                userID: user.id,
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
        set_Description(gat.description)
        handleModal();
    }

    async function check(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            edit(id, Name, Date, Time, Description).then();
            handleModal();
        }
    }


    //Using this will check the id and then edit the data.
    const editData = () => {
        check("gathering", id).then();
        navigation.navigate('Your gatherings')
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
            navigation.navigate('Your gatherings')
            console.log('DELETED the document');
        }
    }
    async function del(collection, id) {
        await deleteDoc(doc(db, collection, id));
    }

    const deleteData = (gat) => {
        checkDel("gathering", gat.id).then();
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.headText}>{item.name}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Budget', {CurrentGathering})}>
                            <Text style={styles.buttonText}>Administer Budget</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Administer Attendees</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity style={[styles.button, styles.bottomButton]} onPress={() => EditBtnFunc(item)}>
                            <Text style={styles.buttonText}>Edit Gathering</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteData(item)}>
                            <Text style={styles.buttonText}>Delete </Text>
                        </TouchableOpacity>
                    </View>


                    {/* This is the popup that appears when you click edit at the table */}
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container>
                            <Modal.Header title={"Edit the gathering"}/>
                            <Modal.Body>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.textModal}>New name for gathering:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={set_Name}
                                            value={Name}
                                            placeholder='Name'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Date:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={set_Date}
                                            value={Date}
                                            placeholder='Date'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Time:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={set_Time}
                                            value={Time}
                                            placeholder='Time'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Description:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            multiline
                                            style={styles.input}
                                            onChangeText={set_Description}
                                            value={Description}
                                            placeholder='description'
                                        />
                                    </View>
                                </View>
                            </Modal.Body>
                            <Modal.Footer>
                                <TouchableOpacity onPress={() => handleModal()} style={styles.Button}>
                                    <Text style={styles.Text}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => editData()} style={styles.Button}>
                                    <Text style={styles.Text}> Edit  </Text>
                                </TouchableOpacity>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9',
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        paddingBottom: 5,
        marginBottom: 15,
        borderBottomWidth:0.5,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 30,
    },

    catText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 5,
        marginBottom: 15,
        borderBottomWidth:0.5,
    },
    catContainer: {
        justifyContent: "flex-start",
        flexDirection: "row",
    },


    buttonContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#0A100D',
        color: '#B9BAA3',
        borderRadius: 5,
        paddingVertical: 10,
        flex: 1,
        marginHorizontal: 2,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        color: '#333',
    },


    deleteButton: {
        backgroundColor: '#DE1616'
    },


    modalContainer: {
        flex: 1,
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#D6D5C9',
    },

    text: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 24,
    },
    textModal: {
        fontSize:16,
        color: '#a19f9f',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bababa',
        fontSize: 16,
        padding: '0.5%',
        paddingLeft: 10,
        marginBottom: 25,
    },


    Button: {
        margin: 5,
        padding: 8,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
    },
    Text: {
        color: "black",
        fontWeight: "700",
        fontSize: 18,
    },

});




