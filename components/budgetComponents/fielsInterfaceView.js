import React, {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {currentCategory, currentField, currentGathering} from "../global_variables";
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AddBudgetCategoryView, EditBudgetCategoryView} from "./budget_categoryFieldView";
import {Icon} from "react-native-elements";


export const FieldView = ({route}) => {

    const { item } = route.params;
    const [category, setCategory] = useState(item.id);
    const [gathering, set_gathering] = currentGathering();



    console.log(category.id);
    console.log(gathering.id);


    // This is variables and functions for fetching and display all the gatherings
    const [field, set_field] = useState([]);


    useEffect(() => {
        const getField = async () => {



            const q = query(collection(db, "gathering", gathering.id, "budget", category,"ListOf" + category));
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

    const [isFieldAddViewVisible, setIsFieldAddViewVisible] = useState(false);

    const handleAddModal = () => {
        setIsFieldAddViewVisible(() => !isFieldAddViewVisible)
    }

    const [isFieldEditViewVisible, setIsFieldEditViewVisible] = useState(false);

    const handleEditModal = () => {
        setIsModalVisible(() => !isModalVisible)
        setIsFieldEditViewVisible(() => !isFieldEditViewVisible)
    }

    const handleDeleteModal = async () => {

        const docRef1 = doc(db,"gathering", gathering.id, "budget", category)
        const docSnap1 = await getDoc(docRef1).then();

        const docRef2 = doc(db,"gathering", gathering.id, "budget", category, "ListOf" + category, field_id)
        const docSnap2 = await getDoc(docRef2).then();


        await setDoc(doc(db,"gathering", gathering.id, "budget", category.id), {
            name: docSnap2.data().name,
            totalCost: docSnap1.data().totalCost - docSnap2.data().totalCost
        });

        await deleteDoc(doc(db,"gathering", gathering.id, "budget", category, "ListOf" + category, field_id));
        setIsModalVisible(() => !isModalVisible)
    }

    //This is the view that you will see at Home in app
    return (
        <View style={styles.container}>
            <ScrollView>
                <Button
                    title="Add"
                    onPress={handleAddModal}
                />
                <View>
                    {field.map((item) => (
                        <View key={item.id} style={styles.category}>
                            <TouchableOpacity onPress={() => handleModal(item)}>
                                <View style={styles.gat}>
                                    <View style={styles.CatName}>
                                        <Text style={styles.text}> {item.name}</Text>
                                        <Text> Amount: {item.amount} </Text>
                                        <Text> Cost: {item.cost} </Text>
                                        <Text> Total cost: {item.totalCost} </Text>
                                    </View>
                                    <View style={styles.icons}>
                                        <Icon
                                            onPress={() => handleEditModal(item)}
                                            reverse
                                            name='create-outline'
                                            type='ionicon'
                                            color='#517fa4'
                                        />
                                        <Icon
                                            onPress={() => handleDeleteModal(item)}
                                            reverse
                                            name='trash-bin-outline'
                                            type='ionicon'
                                            color='#FF0000'
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}

                </View>
                {isFieldAddViewVisible && <AddBudgetCategoryView/>}
                {isFieldEditViewVisible && <EditBudgetCategoryView />}
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
        backgroundColor: '#D6D5C9',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        paddingBottom: 5,
        marginBottom: 15,
        borderBottomWidth:0.5,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 30,
    },


    category: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        marginBottom: 2,
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CatName: {
        width: 240,
    },


    deleteButton: {
        backgroundColor: '#DE1616'
    },


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



})

