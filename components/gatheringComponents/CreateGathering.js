import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {auth, db} from "../../firebaseConfig";
import {collection, doc, getDoc, setDoc, addDoc} from "firebase/firestore";
import {login, userid, name} from "../loginComponents/loginView";

const Create = () => {

    const user = auth.currentUser;


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
            date: gathDate
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Text>Gathering name:</Text>
            <TextInput
                onChangeText={set_gathName}
                placeholder="gathering name"
            />

            <Text>Time</Text>
            <TextInput
                onChangeText={set_gathTime}
                placeholder="Time"
            />

            <Text>Date</Text>
            <TextInput
                onChangeText={set_gathDate}
                placeholder="Date"
            />

            <Button
                onPress={addData}
                title="Add"
            />
        </View>
    );

}


export default Create;


