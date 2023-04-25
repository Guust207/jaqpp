import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
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
    text: {
        margin: 4,
        fontSize: 16,
        textAlign: 'center'
    },
    gat: {
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
    bioContainer: {
        marginBottom: 20,
    },
    bio: {
        fontSize: 16,
        lineHeight: 24,
    },
});