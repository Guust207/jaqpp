//This is the function that handles profile view and all of its sub functions
import {Alert, TouchableOpacity, Button, Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {currentUser} from "../global_variables";
import {useEffect, useState} from "react";
import {EditBudgetCategoryView} from "../budgetComponents/budget_categoryFieldView";
import {Modal} from "../Modal";


export const ProfileView = (user, setUser) => {

    const [Invitations, setInvitations] = useState([]);
    const [isInvitationView, set_isInvitationView] = useState(false)


    const accountDeleted = () =>
        Alert.alert('Account deleted from JaqPPP','', [
            {text: 'OK'},
        ]);

    const downloadData = async () => {
        // Fetch data from Firestore or any other data source
        const fetchDataFromFirestore = async () => {
            const docRef = doc(db, "users", user.id);
            return await getDoc(docRef);
        }
    }

    async function deleteAccount() {
        const docRef = doc(db,"users", user.id.toString());
        // Delete that document
        await deleteDoc(docRef);
        handleLogout();
    }

    //Function that handles the Sign-out button
    const handleLogout = () => {
        setUser(null);
    }

    const userAlert = () =>
        Alert.alert('Are you sure you want to delete this user?', 'This will delete all of your gatherings etc!!',[
            {
                text: 'Delete',
                onPress: () => handleDeleteAccount(),
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);

    //Function that handles deleteAccount button
    const handleDeleteAccount = async () => {
        console.log(user.id)
        await deleteAccount().then();
        accountDeleted();
    }

    const getInvitation = async () => {
        const q = query(collection(db, "users", user.id, "invitations"));
        onSnapshot(q, (querySnapshot) => {
            const  list = [];

            querySnapshot.forEach((doc) => {
                const { gathering, gatheringName, accepted} = doc.data();

                //list for storing the data
                list.push({
                    id: doc.id,
                    gathering,
                    accepted
                });
            });
            setInvitations(list);
        });
    }

    const handleInvitations = () => {
        getInvitation().then();
        set_isInvitationView(() => !isInvitationView)
    }


    const acceptInvitations = () => {
        getInvitation().then();

        set_isInvitationView(() => !isInvitationView)
        console.log("Accepted");
    }


    const declineInvitations = () => {
        getInvitation().then();
        set_isInvitationView(() => !isInvitationView)
        console.log("Decline");
    }




    //The view that you see at profile view
    return (
        <View>
            <View>
                <Image style={styles.profilePicture} source={{ uri: user.picture }} />
                <View style={styles.bioContainer}>
                    <Text style={styles.message}>{user.name}</Text>
                    <Text style={styles.message}>{user.email}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleInvitations}>
                            <Text style={styles.buttonText}> Invitations</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal isVisible={isInvitationView} >
                        <Modal.Container>
                            <Modal.Header title={"Invitations"} />
                            <Modal.Body>
                                {Invitations.map((item) => (
                                    <View key={item.id} style={styles.category}>
                                        <Text> {item.gathering}</Text>
                                        <TouchableOpacity onPress={acceptInvitations}>
                                            <Text style={styles.text}> Accept </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={declineInvitations}>
                                            <Text style={styles.text}> Decline</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button title="Cancel" onPress={handleInvitations} />
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={downloadData}>
                            <Text style={styles.buttonText}>Download data about user</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={userAlert}>
                            <Text style={styles.buttonText}> Delete my JaqPP account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#D6D5C9'
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
        textAlign: 'center',
        backgroundColor: 'blue'
    },
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
        height: 60,
        width: 60,
        borderRadius: 50,
        marginRight: 40,
        marginBottom: 50,

    },
    logo: {
        aspectRatio: 1,
        marginLeft: 8,
        width: '100%',
        height: undefined,
        borderRadius: 50,
    },
    bioName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#0A100D',
        borderRadius: 5,
        marginBottom: 20,
        flex: 1,
        marginHorizontal: 5,
        padding: 20,
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
})
