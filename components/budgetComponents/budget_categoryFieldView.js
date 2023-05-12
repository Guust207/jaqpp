import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {db} from "../../firebaseConfig";
import { doc, getDoc, setDoc} from "firebase/firestore";
import {Modal} from "../Modal";
import {Buttons} from "../Button";

import uuid from "react-native-uuid";
import {currentField} from "../global_variables";


//TODO: When creating an interface you need to find a way to get budgetCategory and gathering - Currently the function is using dummy value


export const AddBudgetCategoryView = (route) => {

    const gathering = route.gathering
    const category = route.category

    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [categoryID, setCategory] = useState(category.id);


    const [fieldName, set_fieldName] = useState("Name");
    const [fieldCost, set_fieldCost] = useState("Price Pr Unit");
    const [fieldAmount, set_fieldAmount] = useState("Amount");


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
                    <Modal.Header title={'Add new item'}/>
                    <Modal.Body>
                        <View>
                            <Text style={styles.textModal}>Name of item:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_fieldName}
                                    placeholder="Name"
                                />
                            </View>
                            <Text style={styles.textModal}>Price pr Unit:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_fieldCost}
                                    placeholder="Cost Pr Unit"
                                />
                            </View>
                            <Text style={styles.textModal}>Amount:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_fieldAmount}
                                    placeholder="Amount"
                                />
                            </View>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Buttons
                            onPress={() => setIsFieldAddViewVisible(() => !isFieldAddViewVisible)}
                            title="Cancel"
                        />
                        <Buttons
                            onPress={button}
                            title="Add"
                        />
                    </Modal.Footer>
                </Modal.Container>
            </Modal>
        </View>
    )
}

export const EditBudgetCategoryView = (route) => {
    const [currField, set_currField] = currentField();


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
                <Modal.Container>
                    <Modal.Header title={'Edit field: ' + currField.name}/>
                    <Modal.Body>
                        <View>
                            <Text style={styles.textModal}>New name of item:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_fieldName}
                                    value={fieldName}
                                    placeholder="Name"
                                />
                            </View>
                            <Text style={styles.textModal}>New cost Pr Unit:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_fieldCost}
                                    value={fieldCost}
                                    placeholder="Cost Pr Unit"
                                />
                            </View>
                            <Text style={styles.textModal}>New amount:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={set_fieldAmount}
                                    value={fieldAmount}
                                    placeholder="Amount"
                                />
                            </View>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Buttons
                            onPress={() => setIsFieldEditViewVisible(() => !isFieldEditViewVisible)}
                            title="Cancel"
                        />
                        <Buttons
                            onPress={button}
                            title="Edit"
                        />
                    </Modal.Footer>
                </Modal.Container>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

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