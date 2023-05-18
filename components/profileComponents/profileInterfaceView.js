//This is the function that handles profile view and all of its sub functions
import {Alert, TouchableOpacity, Image, Text, View, ScrollView} from "react-native";
import * as React from "react";
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {currentUser} from "../global_variables";
import {useState} from "react";
import {Modal} from "../Modal";
import {Buttons} from "../Button";
import {styles} from "../Styles";

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
        <View style={styles.nonHeaderContainer}>
            <ScrollView>
                <View>
                    <View style={styles.bioContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.profilePicture} source={{ uri: user.picture }} />
                        </View>
                        <Text style={
                            {fontSize: 24,
                            fontWeight: 'bold',
                            color: '#333333',
                            textAlign: 'center',
                            marginBottom: 16,}
                        }>{user.name}</Text>
                    </View>
                    <Text style={styles.bioEmail}>Mail: {user.email}</Text>
                    <View style={styles.profileButton}>
                        <TouchableOpacity style={styles.button} onPress={handleInvitations}>
                            <Text style={styles.buttonText}> Your invitations</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileButton}>
                        <TouchableOpacity style={styles.button} onPress={downloadData}>
                            <Text style={styles.buttonText}>Download data about user</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileButton}>
                        <TouchableOpacity onPress={userAlert} style={{alignItems: 'center'}}>
                            <Text style={styles.deleteButtonText}> Delete my JaqPP account</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileButton]}>
                        <TouchableOpacity style={styles.signOutButtonContainer} onPress={handleLogout}>
                            <Text style={styles.signOutButtonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal isVisible={isInvitationView} >
                    <Modal.Container>

                        <Modal.Header title={"Invitations"} />

                        <Modal.Body>
                                <View style={styles.inviteModalContainer}>
                                    <ScrollView>

                                    {Invitations.map((item) => (
                                    <View key={item.id} style={styles.category}>

                                        <View style={styles.gatContainer}>

                                            <View style={styles.invitesContainer}>
                                                <Text style={{
                                                    fonts: 15,
                                                    fontWeight: 'bold',
                                                }}> {item.gatheringName}</Text>

                                                <TouchableOpacity onPress={() => acceptInvitations(item)}>

                                                    <Text style={styles.invitesText}> Accept </Text>

                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => declineInvitations(item)}>

                                                    <Text style={styles.invitesText}> Decline</Text>

                                                </TouchableOpacity>


                                            </View>


                                        </View>

                                    </View>
                                ))}
                                    </ScrollView >

                                </View>

                        </Modal.Body>

                        <Modal.Footer>
                            <Buttons title="Cancel" onPress={handleInvitations} />
                        </Modal.Footer>

                    </Modal.Container>
                </Modal>
            </ScrollView>
        </View>
    );
}

