//View all students and information function
import {collection, doc, getDoc, query, onSnapshot, setDoc, where} from "firebase/firestore";
import {auth, db} from "../firebaseConfig";
import React, {useEffect, useState} from "react";
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";


//Component Imports
import {Modal} from "./Modal";


const Edit = () => {

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
                        const { name, date, time } = doc.data();

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


    //This is the view that you will see at Home in app
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    {gat.map((item) => (
                        <View key={item.id} style={styles.gat}>
                            <Text style={styles.text}> {item.name}</Text>
                            <Text style={styles.text}> Date: {item.date}, Time: {item.time}</Text>
                            <TouchableOpacity onPress={() => EditBtnFunc(item)}>
                                <Text style={styles.edit}>Edit</Text>
                            </TouchableOpacity>
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



//Style
const styles = StyleSheet.create({
        container: { flex: 1, padding: 5, justifyContent: 'flex-start', backgroundColor: 'white'},
        head: { height: 44, backgroundColor: 'gray'},
        headText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black'},
        text: { margin: 4, fontSize: 16, textAlign: 'center'},
        gat: {backgroundColor: 'lightgrey', padding: 20},
        edit: {fontSize: 20, color: 'orange', width: '100%', backgroundColor: 'grey', textAlign: 'center'},

    }
)


export default Edit;
