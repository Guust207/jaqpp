import {Alert, Button, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {db} from "../../firebaseConfig";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {GlobalStore} from "react-native-global-state-hooks";
import {currentUser} from "../global_variables";


//TODO: When creating an interface you need to find a way to get budgetCategory and gathering - Currently the function is using dummy values
const gatheringID = "gathering55555"
const categoryID = 'food';
const fieldID = 'apple'

export const AddBudgetCategoryView = () => {

    const [fieldName, set_fieldName] = useState(null);
    const [fieldCost, set_fieldCost] = useState(null);
    const [fieldAmount, set_fieldAmount] = useState(null);
    const [user, setUser] = currentUser();



    function GenerateID() {
        const number1 = Math.floor(Math.random() * 9) + 1;
        const number2 = Math.floor(Math.random() * 9) + 1;
        const number3 = Math.floor(Math.random() * 9) + 1;
        const number4 = Math.floor(Math.random() * 9) + 1;
        const number5 = Math.floor(Math.random() * 9) + 1;

        return number1 + number2 + number3 + number4 + number5;
    }


    async function increase_totalCost() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID)
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
                totalCost: docSnap.data().totalCost + (fieldAmount * fieldCost)
            }
        ).then();
    }

    const calculate_totalCost = () => {
        return (fieldAmount*fieldCost);
    }

    const MissingField = () =>
        Alert.alert('Alert!r', 'Please add valid fields', [
            {text: 'OK'},
        ]);

    const FieldExist = () =>
        Alert.alert(fieldName, 'already exists', [
            {text: 'OK'},
        ]);

    const FieldAdded = () =>
        Alert.alert(fieldName, 'has been added!', [
            {text: 'OK'},
        ]);

    async function hasError() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID, "List", fieldID);
        const docSnap = await getDoc(docRef).then();
        if (fieldCost == null || fieldAmount == null) {
            MissingField();
            return false;
        } else if (docSnap.exists()) {
            FieldExist();
            return false;
        } else {
            return true;
        }
    }

    async function button() {
        if (user() == null) {
            console.log('No user')
        } else {
            console.log('User', user(), 'is logged inn')
        }
        if (await hasError() === true) {
            add_CategoryField().then();
            FieldAdded();
            increase_totalCost(calculate_totalCost()).then();
            reset();
        }
    }

    const reset = () => {
        set_fieldName(null);
        set_fieldName(null);
        set_fieldCost(null);
    }


    async function add_CategoryField() {
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID, "List", GenerateID()), {
                name: fieldName,
                costPrUnit: fieldCost,
                amount: fieldAmount,
                totalCost: fieldAmount * fieldCost
            }
        ).then();
    }

    return (
        <View>
            <TextInput
                onChangeText={set_fieldName}
                value={fieldName}
                placeholder="Name"
            />
            <TextInput
                onChangeText={set_fieldCost}
                value={fieldCost}
                placeholder="Cost Pr Unit"
            />
            <TextInput
                onChangeText={set_fieldAmount}
                value={fieldAmount}
                placeholder="Amount"
            />
            <Button
                onPress={button}
                title="Add"
            />
        </View>
    )
}

export const EditBudgetCategoryView = () => {

    const [fieldName, set_fieldName] = useState(null);
    const [fieldCost, set_fieldCost] = useState(null);
    const [fieldAmount, set_fieldAmount] = useState(null);



    async function increase_totalCost() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID)
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
                totalCost: docSnap.data().totalCost + (fieldAmount * fieldCost)
            }
        ).then();
    }

    async function decrease_totalCost() {
        const docRef1 = doc(db,"gathering", gatheringID, "budget", categoryID)
        const docSnap1 = await getDoc(docRef1).then();

        const docRef2 = doc(db,"gathering", gatheringID, "budget", categoryID, "List", fieldID)
        const docSnap2 = await getDoc(docRef2).then();

        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
                totalCost: (docSnap1.data().totalCost) - (docSnap2.data().totalCost)
            }
        ).then();
    }

    const MissingField = () =>
        Alert.alert('Alert!r', 'Please add valid fields', [
            {text: 'OK'},
        ]);

    const FieldExist = () =>
        Alert.alert(fieldName, 'already exists', [
            {text: 'OK'},
        ]);

    const FieldAdded = () =>
        Alert.alert(fieldName, 'has been added!', [
            {text: 'OK'},
        ]);

    async function hasError() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID, "List", fieldID);
        const docSnap = await getDoc(docRef).then();
        if (fieldCost == null || fieldAmount == null) {
            MissingField();
            return false;
        } else if (docSnap.exists()) {
            FieldExist();
            return false;
        } else {
            return true;
        }

    }

    async function button() {
        if (await hasError() === true) {
            await edit_CategoryField().then();
            FieldAdded();
            await decrease_totalCost().then();
            await increase_totalCost().then();
            reset();
        }
    }

    const reset = () => {
        set_fieldName(null);
        set_fieldName(null);
        set_fieldCost(null);
    }


    async function edit_CategoryField() {
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID, "List", fieldID), {
                name: fieldName,
                costPrUnit: fieldCost,
                amount: fieldAmount,
                totalCost: fieldAmount * fieldCost
            }
        ).then();
    }

    return (
        <View>
            <TextInput
                onChangeText={set_fieldName}
                value={fieldName}
                placeholder="Name"
            />
            <TextInput
                onChangeText={set_fieldCost}
                value={fieldCost}
                placeholder="Cost Pr Unit"
            />
            <TextInput
                onChangeText={set_fieldAmount}
                value={fieldAmount}
                placeholder="Amount"
            />
            <Button
                onPress={button}
                title="Edit"
            />
        </View>
    )
}

async function DeleteBudgetCategoryView() {
    const docRef = doc(db,"gathering", gatheringID, "budget", categoryID, "List", fieldID);

    // Delete that document
    await deleteDoc(docRef);
}
