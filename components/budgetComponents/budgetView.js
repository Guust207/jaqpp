import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Modal} from "../Modal";
import {currentCategory, currentGathering} from "../global_variables";
import {useNavigation} from "@react-navigation/native";


export const AddBudgetView = () => {
    const navigation = useNavigation();

    const [categoryID, set_categoryID] = currentCategory();
    const [gathering, setGathering] = currentGathering();

    function GenerateID() {
        const number1 = Math.floor(Math.random() * 9) + 1;
        const number2 = Math.floor(Math.random() * 9) + 1;
        const number3 = Math.floor(Math.random() * 9) + 1;
        const number4 = Math.floor(Math.random() * 9) + 1;
        const number5 = Math.floor(Math.random() * 9) + 1;
        return "category" + number1 + number2 + number3 + number4 + number5;
    }

    const [budgetCategory, set_budgetCategory] = useState(null);


    async function add_budgetCategory() {
        console.log(gathering.id);
        console.log("budgetCategory: ", budgetCategory);
        console.log("categoryID: ", categoryID);
        await setDoc(doc(db, "gathering", gathering.id, "budget", categoryID), {
            name: budgetCategory,
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
        Alert.alert(budgetCategory, ' already exists', [
            {text: 'OK'},
        ]);

    const CategoryAdded = () =>
        Alert.alert(budgetCategory, ' has been added', [
            {text: 'OK'},
        ]);


    async function hasError() {
        const docRef = doc(db, "gathering", gathering.id, "budget", categoryID);
        const docSnap = await getDoc(docRef);
        if (budgetCategory.toLowerCase() === null) {
            MissingCategory();
            return false;
        }
        if (docSnap.exists()) {
            CategoryExist();
            return false;
        }
        return true;
    }


    async function addBudget() {
        set_categoryID(GenerateID());
        if (await hasError() === true) {
            add_budgetCategory().then();
            setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)
        }
    }

    const [isCategoryAddViewVisible, setIsCategoryAddViewVisible] = useState(true);

    return (
        <View>
            <Modal isVisible={isCategoryAddViewVisible}>
                <Modal.Container style={styles.modalContainer}>
                    <View style={styles.container}>

                    <Text style={styles.textModal}>Add a new category:</Text>
                    <TextInput
                        style={styles.textModal}
                        onChangeText={set_budgetCategory}
                        value={budgetCategory}
                        placeholder="food, decoration, etc"
                    />
                    <Button
                        onPress={addBudget}
                        title="Add"
                    />
                    <Button
                        onPress={() => setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)}
                        title="Cancel"
                    />
                    </View>
                </Modal.Container>
            </Modal>
        </View>
    )
}

export const EditBudgetView = () => {
    const navigation = useNavigation();

    const [gathering, setGathering] = currentGathering();
    const [categoryID, set_id] = currentCategory();
    const [budgetCategory_tmp, set_budgetCategory_tmp] = useState('');


    console.log(categoryID);
    async function edit_budgetCategory() {
        const docRef = doc(db,"gathering", gathering.id, "budget", categoryID);
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gathering.id, "budget", categoryID), {
                totalCost: docSnap.data().totalCost,
                name: budgetCategory_tmp
            }
        ).then();
    }

    const MissingCategory = () =>
        Alert.alert('Alert!r', 'Please add valid category', [
            {text: 'OK'},
        ]);

    const CategoryExist = () =>
        Alert.alert(budgetCategory_tmp, ' already exists', [
            {text: 'OK'},
        ]);

    const CategoryAdded = () =>
        Alert.alert(budgetCategory_tmp, ' has been edited', [
            {text: 'OK'},
        ]);


    async function hasError() {
        const docRef = doc(db,"gathering", gathering.id, "budget", categoryID);
        const docSnap = await getDoc(docRef);
        if (budgetCategory_tmp.toLowerCase() === null) {
            MissingCategory();
            return false;
        }
        if (docSnap.data().name === budgetCategory_tmp) {
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
                <Modal.Container style={styles.modalContainer}>
                    <View style={styles.container}>
                        <Text style={styles.textModal}>New name for category:</Text>
                        <TextInput
                            style={styles.in}
                            onChangeText={set_budgetCategory_tmp}
                            value={set_budgetCategory_tmp}
                            placeholder="food, decoration, etc"
                        />
                        <Button
                            onPress={editBudget}
                            title="Edit"
                        />
                        <Button
                            onPress={() => setIsCategoryEditViewVisible(() => !isCategoryEditViewVisible)}
                            title="Cancel"
                        />
                     </View>
                </Modal.Container>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({

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