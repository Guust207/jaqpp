//View all students and information function
import {collection, doc, getDoc, query, onSnapshot, setDoc, where, deleteDoc} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";


//Component Imports
import {Modal} from "../Modal";

const Edit = ({navigation}) => {

    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const user = auth.currentUser;


    useEffect(() => {
        const getAllGat = async () => {


            if (user !== null) {
                const uid = user.uid;
                console.log("  Provider-specific UID: " + uid);


                const q = query(collection(db, "gathering"), where("userID", "==", uid));
                onSnapshot(q, (querySnapshot) => {
                    const  list = [];

                    querySnapshot.forEach((doc) => {
                        const { name, date, time} = doc.data();

                        //list for storing the data
                        list.push({
                            id: doc.id,
                            name,
                            date,
                            time,
                        });
                    });

                    setGat(list);
                });
            }
        }
        getAllGat();

    },[])


    //Edit part
    //Variables and functions that handles the edit part
    const [id, set_id] = useState(id);
    const [Name, set_Name] = useState(Name);
    const [Date, set_Date] = useState(Date);
    const [Time, set_Time] = useState(Time);



    //Function for editing a gathering
    async function edit(id, gatName, gatDate, gatTime) {
        await setDoc(doc(db, "gathering", id), {
                name: gatName,
                date: gatDate,
                time: gatTime,
                userID: user.uid,
            }
        );
    }



    //This is  the Edit function for the Edit button located at the Home in the app
    //Its main responsibility is getting the documentID of the column selected, then fetching the edited variables.
    const EditBtnFunc = (gat) => {
            set_id(gat.id);
            set_Name(gat.name);
            set_Date(gat.date);
            set_Time(gat.time);
            handleModal();
    }

    async function check(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            edit(id, Name, Date, Time).then();
            handleModal();
        }
    }


    //Using this will check the id and then edit the data.
    const editData = () => {
        check("gathering", id).then();
    }

    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible)

    };



    //Delete part
       async function checkDel(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            del("gathering", id).then();
            console.log('DELETED the document');
        }
    }
    async function del(collection, id) {
        await deleteDoc(doc(db, collection, id));
    }

    const deleteData = () => {
        set_id(gat.id);
        checkDel("gathering", id).then();
    }




    //This is the view that you will see at Home in app
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bioContainer}>
                    <View style={styles.top}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.logo} source={require('../../images/logo.png')} />
                            {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
                        </View>
                        <Text style={styles.bioName}>{user.email}</Text>
                    </View>
                    <View style={styles.bottom}>

                    </View>
                </View>

                <View>
                    {gat.map((item) => (
                        <View key={item.id} style={styles.gatContainer}>
                            {/* i toppen skriv route og i toippen på denne skriv navigation
                            const drink = route.params.drink*/}
                            <TouchableOpacity onPress={() => navigation.navigate('gat')}>
                                <View style={styles.gat}>
                                    <View style={styles.gatImageContainer}>
                                        <Image style={styles.gatImage} source={require('../../images/tiger_bakgrun.jpg')} />
                                        {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={[styles.text, styles.gatName]}> {item.name}</Text>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.text}> 📅{item.date}</Text>
                                            <Text style={styles.text}>:{item.time}</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <View style={styles.gat}>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => EditBtnFunc(item)}>
                                        <Text style={styles.button}> Edit  </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteData(item)}>
                                        <Text style={styles.button}>Delete</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    ))}


                    {/* This is the popup that appears when you click edit at the table */}
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container style={styles.modalContainer}>
                            <Modal.Header title="Edit"/>
                            <Modal.Body>
                                <View style={styles.container}>
                                    <Text style={styles.textModal}>New name for gathering:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={set_Name}
                                            value={Name}
                                            placeholder='Name'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Date:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={set_Date}
                                            value={Date}
                                            placeholder='Date'
                                        />
                                    </View>
                                    <Text style={styles.textModal}>Time:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={set_Time}
                                            value={Time}
                                            placeholder='Time'
                                        />
                                    </View>
                                </View>
                            </Modal.Body>
                            <Modal.Footer>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => editData()}>
                                        <Text style={styles.editButton}> Edit  </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleModal()}>
                                        <Text style={styles.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    )
}


export default Edit;



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
        borderRadius: 50,
        marginRight: 40,
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
    bottom: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 40,

    },


    gatContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        margin:10,
        borderRadius: '10%',
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gatImageContainer: {
        width: 80,
        borderRadius: 50,
        marginRight: 10,
        marginBottom: 10,
    },
    gatImage: {
        aspectRatio: 1,
        width: 80,
        height: undefined,
        borderRadius: 50,
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

});

