import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView,  TextInput,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, setDoc, getDocs, where, deleteDoc} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import {Modal} from "../Modal";
import uuid from 'react-native-uuid';


//Component Imports
import {currentUser} from "../global_variables";




/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const AttendeesInterface = ({route}) => {
    const navigation = useNavigation();

    const [attendeeEmail, set_attendeeEmail] = useState("email");
    const { gathering } = route.params;
    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [gatheringName, set_gatheringName] = useState(gathering.name);

    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const [user, setUser] = currentUser();



    useEffect(() => {
        const getAllGat = async () => {
            const q = query(collection(db, "gathering", gatheringID, "attendees"));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const { Name } = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        Name,

                    });
                });

                setGat(list);
            });
        }
        getAllGat().then();

    },[user])



    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = (field) => {

        setIsModalVisible(() => !isModalVisible)
    };


     const kickAttendee = () => {
         setIsModalVisible(() => !isModalVisible)
     }


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
    return (
        <View style={styles.container}>

            <TouchableOpacity  onPress={inviteAttendees}>
                <Text style={[ styles.kickName]}>Invitation</Text>
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container>
                            <Modal.Header title={"Invite"} />
                            <Modal.Body>
                                <TextInput
                                    style={styles.input}
                                    placeholder="send invitation to this email"
                                    onChangeText={set_attendeeEmail}
                                    placeholderTextColor="#999"
                                />

                                <Button
                                    onPress={sendInvitation}
                                    title="Send"
                                />
                            </Modal.Body>
                        </Modal.Container>
                    </Modal>
            </TouchableOpacity>


            <ScrollView>
                <View>
                    {gat.map((item) => (
                        <View key={item.id} style={styles.gatContainer}>
                            {/* i toppen skriv route og i toippen på denne skriv navigation
                            const drink = route.params.drink*/}
                                <View style={styles.gat}>
                                    <View style={styles.nameContainer}>
                                        <Text style={[styles.text, styles.gatName]}> {item.Name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={kickAttendee}>
                                        <Text style={[ styles.kickName]}>Kick</Text>
                                    </TouchableOpacity>
                                </View>

                            <View style={styles.gat}>

                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}







//Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#D6D5C9',
    },
    bioContainer: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    top: {
        flexDirection: 'row',
        marginBottom: -20
    },
    imageContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        borderRadius: 25,
        marginRight: 40,
    },
    bioName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    bottom: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 40,

    },


    gatContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        margin:10,
        borderRadius: 25,
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gatImageContainer: {
        width: 80,
        borderRadius: 25,
        marginRight: 10,
        marginBottom: 10,
    },
    gatImage: {
        aspectRatio: 1,
        width: 80,
        height: undefined,
        borderRadius: 25,
    },
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        flex: 1,
    },
    text: {
        fontSize: 16,
    },
    gatName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },


    gatInvite: {
        fontSize: 20,
        borderBottomColor: 'black',
    },


    kickName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingLeft: 100,
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

});


