import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from "react-native";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {budgetCategoryView} from "./budget_categoryFieldView";

const categoryID = 'categoryID'
const gatheringID = "gathering55555"

export const AddBudgetView = () => {

    function GenerateID() {
        const number1 = Math.floor(Math.random() * 9) + 1;
        const number2 = Math.floor(Math.random() * 9) + 1;
        const number3 = Math.floor(Math.random() * 9) + 1;
        const number4 = Math.floor(Math.random() * 9) + 1;
        const number5 = Math.floor(Math.random() * 9) + 1;
        return number1 + number2 + number3 + number4 + number5;
    }

    const [budgetCategory, set_budgetCategory] = useState(null);


    async function add_budgetCategory() {
        await setDoc(doc(db, "gathering", gatheringID, "budget", GenerateID()), {
            name: budgetCategory,
            totalCost: null
            }
        ).then();
        CategoryAdded();
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

    const reset = () => {
        set_budgetCategory(null)
    }

    async function hasError() {
        const docRef = doc(db, "gathering", gatheringID, "budget", categoryID);
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
        if (await hasError() === true) {
            add_budgetCategory().then();
            reset();
        }
    }

    return (
        <View>
            <TextInput
                onChangeText={set_budgetCategory}
                value={budgetCategory}
                placeholder="food, decoration, etc"
            />
            <Button
                onPress={addBudget}
                title="Add"
            />
        </View>
    )
}

export const EditBudgetView = () => {
    const [budgetCategory_tmp, set_budgetCategory_tmp] = useState(null);


    async function edit_budgetCategory() {
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
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
        Alert.alert(budgetCategory_tmp, ' has been added', [
            {text: 'OK'},
        ]);

    const reset = () => {
        set_budgetCategory_tmp(null)
    }

    async function hasError() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID);
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
            reset();
        }
    }

    return (
        <View>
            <TextInput
                onChangeText={set_budgetCategory_tmp}
                value={budgetCategory_tmp}
                placeholder="food, decoration, etc"
            />
            <Button
                onPress={editBudget}
                title="edit"
            />
        </View>
    )
}

async function DeleteBudgetCategoryView() {
    const docRef = doc(db,"gathering", gatheringID, "budget", categoryID);

    // Delete that document
    await deleteDoc(docRef);
}
