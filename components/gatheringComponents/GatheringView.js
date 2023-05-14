import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {currentGathering, currentUser} from "../global_variables";
import { useNavigation } from '@react-navigation/native';
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";


import {Modal} from "../Modal";
import {styles} from "../Styles";


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



    const handleBudgetButton = (gathering) => {
        console.log("THIS", gathering.id)
        navigation.navigate('Budget', { gathering: gathering })
    }


    const handleAttendees = (gathering) => {
        console.log("THIS", gathering.id)
        navigation.navigate('Attendees', { gathering: gathering })
    }


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
                <View style={styles.gatheringInformation}>
                    <Text style={styles.headText}>Gathering Information</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Text style={styles.descriptionText2}>Date - {item.date}, Time - {item.time}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.gatheringButton} onPress={() => handleBudgetButton(item)}>
                            <Text style={styles.buttonText}>Administer Budget</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gatheringButton} onPress={() => handleAttendees(item)}>
                            <Text style={styles.buttonText}>Administer Attendees</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity style={styles.gatheringButton} onPress={() => EditBtnFunc(item)}>
                            <Text style={styles.buttonText}>Edit Gathering</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={[styles.gatheringButton, styles.deleteButton]} onPress={() => deleteData(item)}>
                            <Text style={styles.buttonText}>Delete </Text>
                        </TouchableOpacity>
                    </View>


                    {/* This is the popup that appears when you click edit at the table */}
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container>
                            <Modal.Header title={"Edit the gathering"}/>
                            <Modal.Body>
                                <View>
                                    <Text style={styles.textModal}>New name for gathering:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.modalInput}
                                            onChangeText={set_Name}
                                            value={Name}
                                            placeholder='Name'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Date:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.modalInput}
                                            onChangeText={set_Date}
                                            value={Date}
                                            placeholder='Date'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Time:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.modalInput}
                                            onChangeText={set_Time}
                                            value={Time}
                                            placeholder='Time'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Description:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            multiline
                                            style={styles.modalInput}
                                            onChangeText={set_Description}
                                            value={Description}
                                            placeholder='description'
                                        />
                                    </View>
                                </View>
                            </Modal.Body>
                            <Modal.Footer>
                                <TouchableOpacity onPress={() => handleModal()} style={styles.modalButton}>
                                    <Text style={styles. buttonTexts}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => editData()} style={styles.modalButton}>
                                    <Text style={styles.buttonTexts}> Edit  </Text>
                                </TouchableOpacity>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    )
}




