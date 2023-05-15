import React, {useState} from 'react';
import {TouchableOpacity, Text, TextInput, View, Button, Image, ActivityIndicator} from "react-native";
import {auth, db} from "../../firebaseConfig";
import {collection, doc, getDoc, setDoc, addDoc} from "firebase/firestore";
import {currentUser} from "../global_variables";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../Styles";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

const Create = () => {
    const navigation = useNavigation();
    const [user, setUser] = currentUser();
    function GenerateID() {
        return uuid.v4();

    }

    const [gathName, set_gathName] = useState("Name");
    const [gathTime, set_gathTime] = useState("time");
    const [gathDate, set_gathDate] = useState("mm.dd.yyyy");
    const [gathDescription, set_gathDescription] = useState("");
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    async function add(id, gathName, gathTime, gathDate, gathDescription, image) {
        const gatheringRef = doc(db, "gathering", id);

        // Add gathering data to the main 'gathering' collection
        await setDoc(gatheringRef, {
            name: gathName,
            time: gathTime,
            date: gathDate,
            description: gathDescription,
            userID: user.id,
            image: image,
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
            add(id, gathName, gathTime, gathDate, gathDescription, image).then();
        }
        navigation.navigate('Your gatherings');
    }


    const addData = () => {
        check("gathering", GenerateID()).then();
    }



    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                console.log("failed");
            };
            xhr.responseType = 'blob';
            xhr.open('GET', ImagePicker, true);
            xhr.send(null);
        })
        const ref = firebase.storage().ref().child(`Pictures/Image1`)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,

            ()=>{
                setUploading(true)
            },

            (error) => {
                setUploading(false)
                blob.close()
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false)
                    setImage(url)
                    blob.close()
                    return url
                })
            }
        )
    }





    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4,3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };


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
            <View style={styles.inputContainer}>
                {image && <Image source={{uri: image}} style={{width: 170 , height: 170}}/>}
                <Button title='Select Image' onPress={selectImage} />
                {!uploading ? <Button title='Upload Image'        onChangeText={setImage}
                                      onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}

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
