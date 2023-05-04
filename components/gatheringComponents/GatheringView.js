import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {currentGathering, currentUser} from "../global_variables";
import { useNavigation } from '@react-navigation/native';

import {Modal} from "../Modal";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db} from "../../firebaseConfig";

export const GatheringView = ({route}) => {

    const [CurrentGathering, setCurrentGathering] = currentGathering();
    const navigation = useNavigation();
    const { item } = route.params;
    const [user, setUser] = currentUser();


    //Edit part
    //Variables and functions that handles the edit part
    const [id, set_id] = useState(item.id);
    const [Name, set_Name] = useState(Name);
    const [Date, set_Date] = useState(Date);
    const [Time, set_Time] = useState(Time);



    //Function for editing a gathering
    async function edit(id, gatName, gatDate, gatTime) {
        await setDoc(doc(db, "gathering", id), {
                name: gatName,
                date: gatDate,
                time: gatTime,
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


    const handleBudgetButton = (gathering) => {
        console.log("THIS", gathering.id)
        navigation.navigate('Budget', { gathering: gathering })
    }



    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text>
                        Hello {item.name}
                    </Text>
                    <Button
                        title={"Administer Budget"}
                        onPress={() => handleBudgetButton(item)}
                    />
                    <Button
                        title={"Administer Attendees"}

                    />
                    <View style={styles.gat}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => EditBtnFunc(item)}>
                                <Text style={styles.button}> Edit  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteData(item)}>
                                <Text style={styles.button}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* This is the popup that appears when you click edit at the table */}
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container style={styles.modalContainer}>
                            <Modal.Header title="Edit"/>
                            <Modal.Body>
                                <View style={styles.container}>
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
                                </View>
                            </Modal.Body>
                            <Modal.Footer>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => editData()}>
                                        <Text style={styles.editButton}> Edit  </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleModal()}>
                                        <Text style={styles.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
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
        justifyContent: 'flex-start',
        backgroundColor: '#D6D5C9',
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

    text: {
        fontSize: 16,
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

});




