//View all students and information function
import {collection, doc, getDoc, getDocs, query, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {Table, Row, Cell, TableWrapper} from 'react-native-table-component';
import React, {useEffect, useState} from "react";
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Pressable} from "react-native";

//Component Imports
import {Modal} from "./Modal";


const Edit = () => {

    //Handling the backend of the table at Home in app
    const tableData = {
        tableHead: ['Gathering', 'Date', 'Surname', 'DOB', 'Score', 'Grade', 'Delete', 'Edit'],
        tableData: [],
        colWidth: [120, 120, 120, 120, 120, 120, 120, 120]
    };

    const [data, setData] = useState(tableData);

    useEffect(() => {
        const getAll = async () => {


            const q = query(collection(db, "gathering"));
            onSnapshot(q, (querySnapshot) => {
                const dataObject = JSON.parse(JSON.stringify(data));

                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    let  arr = [];

                    if (doc.data()['name'] != null)
                        arr.push(doc.data()['name'].toString());
                    else
                        arr.push("-");

                    if (doc.data()['date'] != null)
                        arr.push(doc.data()['date'].toString());
                    else
                        arr.push("-");

                    if (doc.data()['time'] != null)
                        arr.push(doc.data()['time'].toString());
                    else
                        arr.push("-");

                    arr.push(['buttonD'].toString());

                    arr.push(['buttoneE'].toString());

                    dataObject.tableData.push(arr);
                });

                setData(dataObject);
            });
        }

        getAll();


    },[])
    //Style
    const styles = StyleSheet.create({
            container: { flex: 1, padding: 5, justifyContent: 'flex-start', backgroundColor: 'white'},
            head: { height: 44, backgroundColor: 'gray'},
            headText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black'},
            text: { margin: 4, fontSize: 16, textAlign: 'center'},
        }
    )

    async function edit(id, gatName, gatTime, gatDate) {
        await setDoc(doc(db, "gathering", id), {
                name: gatName,
                time: gatTime,
                date: gatDate,
            }
        );
    }


    //This is  the Edit function for the Edit button located at the Home in the app
    //Its main responsibility is getting the documentID of the column selected, then fetching the edited variables.
    const EditBtnFunc = async(rowIndex) => {
        const queryGat = query(collection(db, "gathering"));
        const querySnapshot1 = await getDocs(queryGat);

        //VARIABLES FOR STUDENT
        const GatId = querySnapshot1.docs[rowIndex-1].id;
        const Name = querySnapshot1.docs[rowIndex-1].data().name;
        const Date = querySnapshot1.docs[rowIndex-1].data().date;
        const Time = querySnapshot1.docs[rowIndex-1].data().time;

        set_id(GatId);
        set_Name(Name);
        set_Date(Date);
        set_Time(Time);
        handleModal();
    }

    //This is the Edit button located at Home in the app
    const renderEditBtn = (rowData, cellData1) => {
        return (
            <TouchableOpacity onPress={() => EditBtnFunc(cellData1)}>
                <Text style={{color: 'red'}}>Edit</Text>
            </TouchableOpacity>
        );
    }


    //Variables and functions that handles the edit part
    const [id, set_id] = useState(id);
    const [Name, set_Name] = useState(Name);
    const [Date, set_Date] = useState(Date);
    const [Time, set_Time] = useState(Time);

    async function check(collection, id) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            edit(id, Name, Date, Time).then();
        }
    }

    const editData = () => {
        check("gathering", id).then();
    }

    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);


    //This is the view that you will see at Home in app
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>


                    <Table borderStyle={{ borderWidth: 4}}>
                        <Row data={data.tableHead} widthArr={data.colWidth} style={styles.head} textStyle={styles.headText}/>
                        {
                            data.tableData.map((rowData, rowIndex) => (
                                <TableWrapper textStyle={styles.headText} key={rowIndex} style={{ flexDirection: 'row' }}>
                                    {rowData.map((cellData, cellIndex) => (
                                        <Cell style={{color: 'blue'}} width={80} key={cellIndex} data={ cellIndex === 2 ? ( renderEditBtn(rowData, rowIndex + 1)) : (cellData)}/>
                                    ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>

                    {/* This is the popup that appears when you click edit at the table */}
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container>
                            <Modal.Header title="Edit" />
                            <Modal.Body>
                                <Text>New name for gathering:</Text>
                                <TextInput
                                    onChangeText={set_Name}
                                    value={Name}
                                    placeholder='Name'
                                />

                                <Text>Last Name:</Text>
                                <TextInput
                                    onChangeText={set_Date}
                                    value={Date}
                                    r            placeholder='Date'
                                />

                                <Text>Date of Birth:</Text>
                                <TextInput
                                    onChangeText={set_Time}
                                    value={Time}
                                    placeholder='Time'
                                />

                                <Button
                                    onPress={editData}
                                    title="Edit"
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button title="Cancel" onPress={handleModal} />
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    )
}

export default Edit;
