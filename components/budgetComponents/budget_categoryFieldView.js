import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {db} from "../../firebaseConfig";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {currentCategory, currentField, currentGathering, currentUser} from "../global_variables";
import {Modal} from "../Modal";
import {Gathering} from "../gatheringComponents/Gathering";
import uuid from "react-native-uuid";


//TODO: When creating an interface you need to find a way to get budgetCategory and gathering - Currently the function is using dummy value


export const AddBudgetCategoryView = (route) => {

    const gathering = route.gathering
    const category = route.category

    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [categoryID, setCategory] = useState(category.id);


    const [fieldName, set_fieldName] = useState(null);
    const [fieldCost, set_fieldCost] = useState(null);
    const [fieldAmount, set_fieldAmount] = useState(null);
    const [fieldID, setField] = useState(null);


    function GenerateID() {
        const number1 = Math.floor(Math.random() * 9) + 1;
        const number2 = Math.floor(Math.random() * 9) + 1;
        const number3 = Math.floor(Math.random() * 9) + 1;
        const number4 = Math.floor(Math.random() * 9) + 1;
        const number5 = Math.floor(Math.random() * 9) + 1;

        return number1.toString() + number2.toString() + number3.toString() + number4.toString() + number5.toString();
    }


    async function increase_totalCost() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID)
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
            name: docSnap.data().name,
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

    const button = () => {
        const id = uuid.v4();
        setField(id);
        button1(id).then()
    }


    async function button1(fieldID) {
        add_CategoryField(fieldID).then();
        setIsFieldAddViewVisible(() => !isFieldAddViewVisible)
    }


    const [isFieldAddViewVisible, setIsFieldAddViewVisible] = useState(true);

    async function add_CategoryField(id) {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID, "ListOf", id);
        const docSnap = await getDoc(docRef).then();
        if (fieldCost == null || fieldAmount == null) {
            MissingField();
            return ;
        } else if (docSnap.exists()) {
            FieldExist();
            return ;
        } else {
            await setDoc(doc(db, "gathering", gatheringID, "budget", categoryID, "ListOf" + categoryID, id), {
                    name: fieldName,
                    costPrUnit: fieldCost,
                    amount: fieldAmount,
                    totalCost: fieldAmount * fieldCost
                }
            ).then();
        }
        increase_totalCost(calculate_totalCost()).then();
    }

    return (
        <View>
            <Modal isVisible={isFieldAddViewVisible}>
                <Modal.Container style={styles.modalContainer}>
                    <View style={styles.container}>
                        <Text style={styles.textModal}>New name for item:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={set_fieldName}
                                value={fieldName}
                                placeholder="Name"
                            />
                        </View>
                        <Text style={styles.textModal}>New price pr Unit:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={set_fieldCost}
                                value={fieldCost}
                                placeholder="Cost Pr Unit"
                            />
                        </View>
                        <Text style={styles.textModal}>New Amount:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={set_fieldAmount}
                                value={fieldAmount}
                                placeholder="Amount"
                            />
                        </View>
                        <Button
                            onPress={button}
                            title="Add"
                        />
                        <Button
                            onPress={() => setIsFieldAddViewVisible(() => !isFieldAddViewVisible)}
                            title="Cancel"
                        />
                    </View>
                </Modal.Container>
            </Modal>
        </View>
    )
}

export const EditBudgetCategoryView = (route) => {

    const gathering = route.gathering
    const category = route.category
    const field = route.field

    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [categoryID, setCategory] = useState(category.id);

    const [fieldID, setField] = useState(field.id);
    const [fieldName, set_fieldName] = useState(field.name);
    const [fieldCost, set_fieldCost] = useState(field.costPrUnit);
    const [fieldAmount, set_fieldAmount] = useState(field.amount);
    const [field_totalCost, set_field_totalCost] = useState(field.totalCost);




    async function increase_totalCost() {
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID)
        const docSnap = await getDoc(docRef).then();
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
                name: docSnap.data().name,
                totalCost: docSnap.data().totalCost + (fieldAmount * fieldCost)
            }
        ).then();
    }

    async function decrease_totalCost() {
        const docRef1 = doc(db,"gathering", gatheringID, "budget", categoryID)
        const docSnap1 = await getDoc(docRef1).then();

        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID), {
                name: docSnap1.data().name,
                totalCost: (docSnap1.data().totalCost) - field_totalCost
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
        const docRef = doc(db,"gathering", gatheringID, "budget", categoryID, "ListOf", fieldID);
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
            await decrease_totalCost().then();
            await increase_totalCost().then();
            setIsFieldEditViewVisible(() => !isFieldEditViewVisible)
        }
    }



    async function edit_CategoryField() {
        await setDoc(doc(db,"gathering", gatheringID, "budget", categoryID, "ListOf" + categoryID, fieldID), {
                name: fieldName,
                costPrUnit: fieldCost,
                amount: fieldAmount,
                totalCost: fieldAmount * fieldCost
            }
        ).then();
    }

    const [isFieldEditViewVisible, setIsFieldEditViewVisible] = useState(true);

    return (
        <View>
            <Modal isVisible={isFieldEditViewVisible}>
                <Modal.Container style={styles.modalContainer}>
                    <View style={styles.container}>
                        <Text style={styles.textModal}>New name for gathering:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={set_fieldName}
                                value={fieldName}
                                placeholder="Name"
                            />
                        </View>
                        <Text style={styles.textModal}>Date:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={set_fieldCost}
                                value={fieldCost}
                                placeholder="Cost Pr Unit"
                            />
                        </View>
                        <Text style={styles.textModal}>Time:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={set_fieldAmount}
                                value={fieldAmount}
                                placeholder="Amount"
                            />
                        </View>
                        <Button
                            onPress={button}
                            title="Edit"
                        />
                        <Button
                            onPress={() => setIsFieldEditViewVisible(() => !isFieldEditViewVisible)}
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