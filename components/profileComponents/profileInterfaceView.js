//This is the function that handles profile view and all of its sub functions
import {Alert, TouchableOpacity, Button, Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {currentUser} from "../global_variables";
import {useState} from "react";
import {Modal} from "../Modal";


export const ProfileView = () => {


    const [user, setUser] = currentUser();
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
                    gatheringName,
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


    const acceptInvitations = async (item) => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();


        const gatheringRef1 = doc(db, "gathering", item.gathering, "attendees", user.id);



        // Add gathering data to the main 'gathering' collection
        await setDoc(gatheringRef1, {
            date: date + '-' + month + '-' + year,
            fullName: user.name,
            email: user.email,
            image: user.picture,
        });


        // Delete Invitation after accepting
        const gatheringRef2 = doc(db, "users", user.id, "invitations", item.id);
        await deleteDoc(gatheringRef2)

        set_isInvitationView(() => !isInvitationView)

        console.log("Accepted");
    }


    const declineInvitations = async (item) => {
        // Delete Invitation after accepting
        const gatheringRef2 = doc(db, "users", user.id, "invitations", item.id);
        await deleteDoc(gatheringRef2)

        set_isInvitationView(() => !isInvitationView)
        console.log("Decline");
    }



    //The view that you see at profile view
    return (
        <View style={styles.container}>

            <View style={styles.bioContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.profilePicture} source={{ uri: user.picture }} />
                </View>
                <Text style={styles.name}>{user.name}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bioEmail}>Mail: {user.email}</Text>
                <View style={[styles.signOutButtonContainer, styles.buttonContainer]}>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
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
                                    <Text> {item.gatheringName}</Text>
                                    <TouchableOpacity onPress={() => acceptInvitations(item)}>
                                        <Text style={styles.text}> Accept </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => declineInvitations(item)}>
                                        <Text style={styles.text}> Delete</Text>
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
                    <TouchableOpacity style={styles.button} onPress={downloadData}>
                        <Text style={styles.buttonText}>Download data about user</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.deleteButtonContainer}>
                    <TouchableOpacity onPress={userAlert}>
                        <Text style={styles.deleteButtonText}> Delete my JaqPP account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9',
        paddingTop: 100,
    },
    bioContainer: {
        justifyContent: 'space-between',
        marginBottom: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0A100D',
        paddingBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        height: 130,
        width: 130,
        borderRadius: 50,
        marginBottom: 20,
    },
    profilePicture: {
        aspectRatio: 1,
        width: '100%',
        height: undefined,
        borderRadius: 50,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    bottomContainer: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bioEmail: {
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 5,
    },

    signOutButtonContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#0A100D',
        paddingBottom: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#0A100D',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        padding: 20,
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
    deleteButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#808080',
        textAlign: 'center',
        fontSize: 16
    },
})






