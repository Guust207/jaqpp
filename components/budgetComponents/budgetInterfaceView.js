import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {auth, db} from "../../firebaseConfig";
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc, where} from "firebase/firestore";
import {Modal} from "../Modal";
import {currentCategory, currentField, currentGathering} from "../global_variables";
import {AddBudgetCategoryView, EditBudgetCategoryView} from "./budget_categoryFieldView";
import {AddBudgetView, EditBudgetView} from "./budgetView";


export const CategoryView = () => {
    const [categoryID, setCategory] = currentCategory();
    const [gathering, set_gathering] = currentGathering();

    const FieldView = () => {


        // This is variables and functions for fetching and display all the gatherings
        const [field, set_field] = useState([]);


        useEffect(() => {
            const getField = async () => {



                const q = query(collection(db, "gathering", gathering.id, "budget", categoryID ,"ListOf" + categoryID));
                onSnapshot(q, (querySnapshot) => {
                    const  list = [];

                    querySnapshot.forEach((doc) => {
                        const { name, amount, costPrUnit, totalCost} = doc.data();

                        //list for storing the data
                        list.push({
                            id: doc.id,
                            name,
                            amount,
                            costPrUnit,
                            totalCost,
                        });
                    });

                    set_field(list);
                });
            }
            getField();
        },[])


        //Variables and functions that handles the edit part
        const [field_id, set_FieldId] = currentField();
        const [field_name, set_name] = useState(field_name);
        const [field_amount, set_amount] = useState(field_amount);
        const [field_cost, set_cost] = useState(field_cost);
        const [totalCost, set_totalCost] = useState(totalCost);


        //Variables used to handle Modal (Popup screen for edit)
        const [isModalVisible, setIsModalVisible] = React.useState(false);
        const handleModal = (field) => {
            set_FieldId(field.id);
            set_name(field.name);
            set_amount(field.amount);
            set_cost(field.costPrUnit);
            set_totalCost(field.totalCost);
            setIsModalVisible(() => !isModalVisible)
        };

        const [isFieldEditViewVisible, setIsFieldEditViewVisible] = useState(false);

        const handleEditModal = () => {

            /*
            const [fieldID, set_fieldID] = currentField();
            const [gatheringID, set_gatheringID] = currentGathering();
            set_gatheringID("gathering55555");
            set_fieldID(field_id);
             */

            setIsModalVisible(() => !isModalVisible)
            setIsFieldEditViewVisible(() => !isFieldEditViewVisible)
        }

        const handleDeleteModal = async () => {

            const docRef1 = doc(db,"gathering", gathering.id, "budget", categoryID)
            const docSnap1 = await getDoc(docRef1).then();

            const docRef2 = doc(db,"gathering", gathering.id, "budget", categoryID, "ListOf" + categoryID, field_id)
            const docSnap2 = await getDoc(docRef2).then();


            await setDoc(doc(db,"gathering", gathering.id, "budget", categoryID), {
                name: docSnap2.data().name,
                totalCost: docSnap1.data().totalCost - docSnap2.data().totalCost
            });

            await deleteDoc(doc(db,"gathering", gathering.id, "budget", categoryID, "ListOf" + categoryID, field_id));
            setIsModalVisible(() => !isModalVisible)
        }

        //This is the view that you will see at Home in app
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        {field.map((item) => (
                            <View key={item.id} style={styles.category}>
                                <TouchableOpacity onPress={() => handleModal(item)}>
                                    <Text style={styles.text}> {item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        {/* This is the popup that appears when you click edit at the table */}
                        <Modal isVisible={isModalVisible} >
                            <Modal.Container>
                                <Modal.Header title={field_name} />
                                <Modal.Body>
                                    <Text> Amount: {field_amount} </Text>
                                    <Text> Cost: {field_cost} </Text>
                                    <Text> Total cost: {totalCost} </Text>
                                    <Button
                                        onPress={handleEditModal}
                                        title="Edit"
                                    />
                                    <Button
                                        onPress={handleDeleteModal}
                                        title="Delete"
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button title="Cancel" onPress={handleModal} />
                                </Modal.Footer>
                            </Modal.Container>
                        </Modal>
                    </View>
                    {isFieldEditViewVisible && <EditBudgetCategoryView />}
                </ScrollView>
            </View>
        )
    }




    // This is variables and functions for fetching and display all the gatherings
    const [category, set_category] = useState([]);


    useEffect(() => {
        const getCategories = async () => {

            const q = query(collection(db, "gathering", gathering.id, "budget"));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const { name, totalCost} = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        name,
                        totalCost,
                    });
                });

                set_category(list);
            });
        }
        getCategories();

    },[])


    //Variables and functions that handles the edit part
    const [category_name, set_Name] = useState(category_name);
    const [totalCost, set_totalCost] = useState(totalCost);


    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = (category) => {
        if (isFieldViewVisible === true) {
            setIsFieldViewVisible(() => !isFieldViewVisible);
        }
        setCategory(category.id);
        set_Name(category.name);
        set_totalCost(category.totalCost);
        setIsModalVisible(() => !isModalVisible)
    };

    const [isFieldViewVisible, setIsFieldViewVisible] = useState(false);
    const enterButton = () => {
        setIsFieldViewVisible(() => !isFieldViewVisible);
        setIsModalVisible(() => !isModalVisible)
    }

    const [isFieldAddViewVisible, setIsFieldAddViewVisible] = useState(false);

    const handleAddModal = () => {
        setIsModalVisible(() => !isModalVisible)
        setIsFieldAddViewVisible(() => !isFieldAddViewVisible)
    }

    const handleDeleteModal = async () => {
        // Delete that document
        await deleteDoc(doc(db,"gathering", gathering.id, "budget", categoryID));
    }

    const [isCategoryEditViewVisible, setIsCategoryEditViewVisible] = useState(false);

    const handleEditModal = async () => {
        setIsModalVisible(() => !isModalVisible)
        setIsCategoryEditViewVisible(() => !isCategoryEditViewVisible)
    }

    const [isCategoryAddViewVisible, setIsCategoryAddViewVisible] = useState(false);

    const handleCategoryAddModal = () => {
        setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)
    }


    //This is the view that you will see at Home in app
    return (
        <View style={styles.container}>
            <Button
                title="Add"
                onPress={handleCategoryAddModal}
            />
            <ScrollView>
                <View>
                    {category.map((item) => (
                        <View key={item.id} style={styles.category}>
                            <TouchableOpacity onPress={() => handleModal(item)}>
                                <Text style={styles.text}> {item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* This is the popup that appears when you click an item at the table */}
                    <Modal isVisible={isModalVisible} >
                        <Modal.Container>
                            <Modal.Header title={category_name} />
                            <Modal.Body>
                                <Text> Total cost: {totalCost} </Text>
                                <Button
                                    onPress={handleEditModal}
                                    title="Edit"
                                />
                                <Button
                                    onPress={handleDeleteModal}
                                    title="Delete"
                                />
                                <Button
                                    onPress={enterButton}
                                    title="Enter"
                                />
                                <Button
                                    onPress={handleAddModal}
                                    title="Add"
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button title="Cancel" onPress={handleModal} />
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>
                {isFieldViewVisible && <FieldView />}
                {isFieldAddViewVisible && <AddBudgetCategoryView/>}
                {isCategoryEditViewVisible && <EditBudgetView />}
                {isCategoryAddViewVisible && <AddBudgetView />}
            </ScrollView>
        </View>
    )
}



//Style
const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            justifyContent: 'flex-start',
            backgroundColor: 'white'
        },
        head: {
            height: 44,
            backgroundColor: 'gray'
        },
        headText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'black'},
        text: {
            margin: 4,
            fontSize: 16,
            textAlign: 'center'
        },
        category: {
            backgroundColor: 'lightgrey',
            padding: 20
        },
        edit: {
            fontSize: 20,
            color: 'orange',
            width: '100%',
            backgroundColor: 'grey',
            textAlign: 'center'
        },
        profilePicture: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
        },
        name: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        bioContainer: {
            marginBottom: 20,
        },
        bio: {
            fontSize: 16,
            lineHeight: 24,
        },
    }
)
