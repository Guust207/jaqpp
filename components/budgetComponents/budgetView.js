import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import {addDoc, deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Modal} from "../Modal";
import {Buttons} from "../Button";
import {currentCategory, currentGathering} from "../global_variables";
import uuid from 'react-native-uuid';


export const AddBudgetView = (route) => {
    const gathering = route.gathering
    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [categoryID, set_categoryID] = useState(null);
    const [categoryName, set_categoryName] = useState(null);


    async function add_budgetCategory(categoryID) {
        const docRef = doc(db, "gathering", gatheringID, "budget", categoryID);
        const docSnap = await getDoc(docRef);
        if (categoryName.toLowerCase() === null) {
            MissingCategory();
            return;
        }
        if (docSnap.exists()) {
            CategoryExist();
            return;
        }
        await setDoc(doc(db, "gathering", gatheringID, "budget", categoryID), {
            name: categoryName,
            totalCost: 0
            }
        ).then();
        setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)
    }

    const MissingCategory = () =>
        Alert.alert('Alert!r', 'Please add valid category', [
            {text: 'OK'},
        ]);

    const CategoryExist = () =>
        Alert.alert(categoryName, ' already exists', [
            {text: 'OK'},
        ]);

    const CategoryAdded = () =>
        Alert.alert(categoryName, ' has been added', [
            {text: 'OK'},
        ]);

    async function addBudget() {
        const id = uuid.v4();
        add_budgetCategory(id).then();
        setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)
    }

    const [isCategoryAddViewVisible, setIsCategoryAddViewVisible] = useState(true);

    return (
        <View>
            <Modal isVisible={isCategoryAddViewVisible}>
                <Modal.Container>
                    <Modal.Header title={'Add a new category'}/>
                    <Modal.Body>
                        <View>
                            <Text style={styles.textModal}>Name of category:</Text>
                            <View style={styles.inputContainer}>

                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_categoryName}
                                    placeholder="Name"
                                />
                            </View>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Buttons
                            onPress={() => setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)}
                            title="Cancel"
                        />
                        <Buttons
                            onPress={addBudget}
                            title="Add"
                        />
                    </Modal.Footer>
                </Modal.Container>
            </Modal>
        </View>
    )
}

export const EditBudgetView = (route) => {
    const [category, set_category] = currentCategory();

    const [gatheringID, set_gatheringID] = useState(route.gathering.id);
    const [tmp_CategoryID, set_tmp_CategoryID] = useState(route.categoryID);
    const [tmp_categoryName, set_tmp_categoryName] = useState(route.categoryName);
    const [tmp_totalCost, set_tmp_totalCost] = useState(route.totalCost);
    console.log(gatheringID)
    console.log(tmp_categoryName)

    async function edit_budgetCategory() {
        const docRef = doc(db,"gathering", gatheringID, "budget", tmp_CategoryID);
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gatheringID, "budget", tmp_CategoryID), {
                totalCost: tmp_totalCost,
                name: tmp_categoryName
            }
        ).then();
    }

    const MissingCategory = () =>
        Alert.alert('Alert!r', 'Please add valid category', [
            {text: 'OK'},
        ]);

    const CategoryExist = () =>
        Alert.alert(tmp_categoryName, ' already exists', [
            {text: 'OK'},
        ]);

    const CategoryAdded = () =>
        Alert.alert(tmp_categoryName, ' has been edited', [
            {text: 'OK'},
        ]);


    async function hasError() {
        const docRef = doc(db,"gathering", gatheringID, "budget", tmp_CategoryID);
        const docSnap = await getDoc(docRef);
        if (tmp_categoryName.toLowerCase() === null) {
            MissingCategory();
            return false;
        }
        if (docSnap.data().name === tmp_categoryName) {
            CategoryExist();
            return false;
        }
        return true;
    }


    async function editBudget() {
        if (await hasError() === true) {
            edit_budgetCategory().then();
            setIsCategoryEditViewVisible(() => !isCategoryEditViewVisible)
        }
    }

    const [isCategoryEditViewVisible, setIsCategoryEditViewVisible] = useState(true);

    return (
        <View>
            <Modal isVisible={isCategoryEditViewVisible}>
                <Modal.Container>
                    <Modal.Header title={'Edit category: ' + category.name}/>
                    <Modal.Body>
                        <View>
                            <Text style={styles.textModal}>New name for category:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_tmp_categoryName}
                                    value={tmp_categoryName}
                                    placeholder="Name"
                                />
                            </View>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Buttons
                            onPress={() => setIsCategoryEditViewVisible(() => !isCategoryEditViewVisible)}
                            title="Cancel"
                        />
                        <Buttons
                            onPress={editBudget}
                            title="Edit"
                        />
                    </Modal.Footer>
                </Modal.Container>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 24,
    },
    textModal: {
        fontSize:16,
        color: '#a19f9f',
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: '8%',
    },
    modalInput: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bababa',
        fontSize: 16,
        padding: '0.5%',
        paddingLeft: 10,
    },
});