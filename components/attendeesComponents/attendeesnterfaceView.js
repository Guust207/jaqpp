import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView,  TextInput,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, setDoc, getDocs, where, deleteDoc} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import {Modal} from "../Modal";
import uuid from 'react-native-uuid';


//Component Imports
import {currentUser} from "../global_variables";
import {styles} from "../Styles";
import {Buttons} from "../Button";
import {Icon} from "react-native-elements";
import {FontAwesome} from "@expo/vector-icons";

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const AttendeesInterface = ({route}) => {
    const navigation = useNavigation();

    const [attendeeEmail, set_attendeeEmail] = useState("email");
    const { gathering , user} = route.params;
    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [gatheringName, set_gatheringName] = useState(gathering.name);

    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);



    useEffect((user) => {
        const getAllGat = async () => {
            const q = query(collection(db, "gathering", gatheringID, "attendees"));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const { email, fullName, image } = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        email,
                        fullName,
                        image,
                    });
                });

                setGat(list);
            });
        }
        getAllGat().then();

    },[user])



    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModalVisible1, setIsModalVisible1] = React.useState(false);

    const handleModal = (field) => {
        setIsModalVisible(() => !isModalVisible)
    };


    const inviteAttendees = () => {
        setIsModalVisible(() => !isModalVisible)
    }

    const generateInvitationID = () => {
        return uuid.v4();
    }

    const sendFunction = async (userID) => {
        const invitationID = generateInvitationID();
        await setDoc(doc(db, "users", userID, "invitations", invitationID), {
            gathering: gatheringID,
            gatheringName: gatheringName,
            accepted: false,
        });
    }

    const sendInvitation = async () => {

        const q = query(collection(db, "users"), where("email", "==", attendeeEmail));

        const querySnapshot = await getDocs(q);
        const foundUser = querySnapshot.size > 0;

        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                sendFunction(doc.id);
            });
        });


        if (foundUser) {
            console.log("Exists");

        } else if (!foundUser) {
            console.log("Doesnt exist");

        }
        setIsModalVisible(() => !isModalVisible)
    }



    const kickAttendee = async (item) => {
        const docRef = doc(db, "gathering", gatheringID, "attendees", item.id);
        await deleteDoc(docRef);

        setIsModalVisible1(() => !isModalVisible1)
        console.log("Kicked");

    }




    return (
        <View style={styles.container}>
            <Button
                title={'Invite friends'}
                onPress={inviteAttendees}
            />
            <Modal isVisible={isModalVisible} >
                <Modal.Container>
                    <Modal.Header title={"Invite"} />
                    <Modal.Body>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Invite by email of the user"
                            onChangeText={set_attendeeEmail}
                            placeholderTextColor="#999"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Buttons
                            onPress={sendInvitation}
                            title="Send"
                        />
                        <Buttons
                            onPress={() => setIsModalVisible(() => !isModalVisible)}
                            title="Cancel"
                        />
                    </Modal.Footer>
                </Modal.Container>
            </Modal>


            <ScrollView>
                <View>
                    <View style={styles.attendees}>
                        <Text style={styles.attendeesText}>Guests for this gathering</Text>
                        {gat.map((item) => (
                            <View key={item.id} style={styles.gatContainer}>
                                {/* i toppen skriv route og i toippen på denne skriv navigation
                                const drink = route.params.drink*/}
                                <View style={[styles.gat, styles.attendeesCont]}>
                                    <View style={styles.attendeesImageContainer}>
                                        <Image style={styles.profilePicture} source={{ uri: item.image }} />
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.attendeesName}>{item.fullName}</Text>
                                        <Text>{item.email}</Text>
                                    </View>
                                    <View style={styles.attendeesIcons}>
                                            <FontAwesome
                                                onPress={() => kickAttendee(item)}
                                                name="remove"
                                                color="#FF0000"
                                                size={40}
                                            />
                                        </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}



