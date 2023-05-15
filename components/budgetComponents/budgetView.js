import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from "react-native";
import {collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Modal} from "../Modal";
import {Buttons} from "../Button";
import {currentCategory} from "../global_variables";
import uuid from 'react-native-uuid';
import {styles} from "../Styles";


export const AddBudgetView = (route) => {
    const gathering = route.gathering
    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [categoryName, set_categoryName] = useState(null);


    async function add_budgetCategory(categoryID) {
        if (categoryName === null) {
            MissingCategory();
            return;
        }

        const q = query(collection(db, "gathering", gatheringID, "budget"), where("name", "==", categoryName));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
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
        Alert.alert('Alert!', 'Please add valid category', [
            {text: 'OK'},
        ]);

    const CategoryExist = () =>
        Alert.alert(categoryName, ' already exists', [
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
