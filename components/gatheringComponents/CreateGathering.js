import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Button, Text, TextInput, View} from "react-native";
import {auth, db} from "../../firebaseConfig";
import {collection, doc, getDoc, setDoc, addDoc} from "firebase/firestore";
import {login, userid, name} from "../loginComponents/loginView";
import {currentUser} from "../global_variables";

const Create = () => {

    const [user, setUser] = currentUser();


    function GenerateID() {
        const number1 = Math.floor(Math.random() * 9) + 1;
        const number2 = Math.floor(Math.random() * 9) + 1;
        const number3 = Math.floor(Math.random() * 9) + 1;
        const number4 = Math.floor(Math.random() * 9) + 1;
        const number5 = Math.floor(Math.random() * 9) + 1;

        return 'gathering' + number1 + number2 + number3 + number4 + number5;
    }

    const [gathName, set_gathName] = useState("Name");
    const [gathTime, set_gathTime] = useState("time");
    const [gathDate, set_gathDate] = useState("mm.dd.yyyy");


    async function add(id, gathName, gathTime, gathDate) {
        const gatheringRef = doc(db, "gathering", id);

        // Add gathering data to the main 'gathering' collection
        await setDoc(gatheringRef, {
            name: gathName,
            time: gathTime,
            date: gathDate,
            userID: user.id,
        });

        const attendeesRef = collection(gatheringRef, 'attendees');

        await addDoc(attendeesRef, {


        });
    }


    async function check(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            check("gathering", GenerateID()).then();
        } else {
            add(id, gathName, gathTime, gathDate).then();
        }
    }


   const addData = () => {
        check("gathering", GenerateID()).then();

    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add information to the new Gathering</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name for Gathering"
                    onChangeText={set_gathName}
                    placeholderTextColor="#999"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={"mm.dd.yyyy"}
                    onChangeText={set_gathDate}
                    placeholderTextColor="#999"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Time of gathering"
                    onChangeText={set_gathTime}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => addData()}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}


export default Create;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6D5C9',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom:20,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        color: '#333',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#0A100D',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
    },
});