import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {auth, db} from "../../firebaseConfig";
import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc, where} from "firebase/firestore";
import {Modal} from "../Modal";
import {currentCategory, currentField, currentGathering} from "../global_variables";
import {AddBudgetCategoryView, EditBudgetCategoryView} from "./budget_categoryFieldView";
import {AddBudgetView, EditBudgetView} from "./budgetView";
import {useNavigation} from "@react-navigation/native";
import {Icon} from "react-native-elements";


export const CategoryView = () => {
    const navigation = useNavigation();


    const [categoryID, setCategory] = currentCategory();
    const [gathering, set_gathering] = currentGathering();



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
    const [isCategoryAddViewVisible, setIsCategoryAddViewVisible] = useState(false);

    const handleCategoryAddModal = () => {
        setCategory(doc.id)
        setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)
    }

    const handleDeleteModal = async (category) => {
        setCategory(category.id);
        set_Name(category.name);
        set_totalCost(category.totalCost);
        // Delete that document
        await deleteDoc(doc(db,"gathering", gathering.id, "budget", categoryID));
    }

    const [isCategoryEditViewVisible, setIsCategoryEditViewVisible] = useState(false);

    const handleEditModal = async (category) => {
        setCategory(category.id);
        set_Name(category.name);
        set_totalCost(category.totalCost);
        setIsModalVisible(() => !isModalVisible);
        setIsCategoryEditViewVisible(() => !isCategoryEditViewVisible);
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
                            <TouchableOpacity onPress={() => navigation.navigate('Field', {item})}>
                                <View style={styles.gat}>
                                    <View style={styles.CatName}>
                                        <Text style={styles.text}> {item.name}</Text>
                                        <Text> Total cost: {item.totalCost}</Text>

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
            backgroundColor: '#D6D5C9'
        },
        head: {
            height: 44,
            backgroundColor: 'gray'
        },
        headText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'black'
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
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
    }
)