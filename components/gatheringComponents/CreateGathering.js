import React, {useState} from 'react';
import {TouchableOpacity, Text, TextInput, View} from "react-native";
import {auth, db} from "../../firebaseConfig";
import {collection, doc, getDoc, setDoc, addDoc} from "firebase/firestore";
import {currentUser} from "../global_variables";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../Styles";

const Create = () => {
    const navigation = useNavigation();
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
    const [gathDescription, set_gathDescription] = useState("");


    async function add(id, gathName, gathTime, gathDate, gathDescription) {
        const gatheringRef = doc(db, "gathering", id);

        // Add gathering data to the main 'gathering' collection
        await setDoc(gatheringRef, {
            name: gathName,
            time: gathTime,
            date: gathDate,
            description: gathDescription,
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
            add(id, gathName, gathTime, gathDate, gathDescription).then();
        }
        navigation.navigate('Your gatherings');
    }


   const addData = () => {
        check("gathering", GenerateID()).then();
    }



    return (
        <View style={styles.nonHeaderContainer}>
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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Description for the gathering"
                    onChangeText={set_gathDescription}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.createButton} onPress={() => addData()}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}


export default Create;