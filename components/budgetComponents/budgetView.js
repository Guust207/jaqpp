import React, {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from "react-native";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Modal} from "../Modal";
import {currentCategory, currentGathering} from "../global_variables";


export const AddBudgetView = () => {

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
        CategoryAdded();
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
        }
    }

    const [isCategoryAddViewVisible, setIsCategoryAddViewVisible] = useState(true);

    return (
        <View>
            <Modal isVisible={isCategoryAddViewVisible}>
                <Modal.Container>
                    <TextInput
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
                </Modal.Container>
            </Modal>
        </View>
    )
}

export const EditBudgetView = () => {
    const [gathering, setGathering] = currentGathering();
    const [budgetCategory_tmp, set_budgetCategory_tmp] = useState(null);
    const [categoryID, set_id] = currentCategory();


    async function edit_budgetCategory() {
        const docRef = doc(db,"gathering", gathering.id, "budget", categoryID);
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gathering.id, "budget", categoryID), {
                totalCost: docSnap.data().totalCost,
                name: budgetCategory_tmp
            }
        ).then();
        CategoryAdded();
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
        }
    }

    const [isCategoryEditViewVisible, setIsCategoryEditViewVisible] = useState(true);

    return (
        <View>
            <Modal isVisible={isCategoryEditViewVisible}>
                <Modal.Container>
                    <TextInput
                        onChangeText={set_budgetCategory_tmp}
                        value={budgetCategory_tmp}
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
                </Modal.Container>
            </Modal>
        </View>
    )
}

async function DeleteBudgetCategoryView() {
    const docRef = doc(db,"gathering", gathering.id, "budget", categoryID);
    // Delete that document
    await deleteDoc(docRef);
}
