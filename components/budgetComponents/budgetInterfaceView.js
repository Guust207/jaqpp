import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {auth, db} from "../../firebaseConfig";
import {collection, deleteDoc, doc, onSnapshot, query} from "firebase/firestore";
import {currentCategory} from "../global_variables";
import {AddBudgetView, EditBudgetView} from "./budgetView";
import {useNavigation} from "@react-navigation/native";
import {Icon} from "react-native-elements";


export const CategoryView = ({route}) => {
    const navigation = useNavigation();
    const { gathering } = route.params;
    const [gatheringID, set_gatheringID] = useState(gathering.id);
    const [categoryList, set_categoryList] = useState([]);
    const [categoryID, set_CategoryID] = useState('');
    const [categoryName, set_categoryName] = useState('');
    const [totalCost, set_totalCost] = useState('');
    const [category, set_category] = currentCategory();


    useEffect(() => {
        const getCategories = async () => {

            const q = query(collection(db, "gathering", gatheringID, "budget"));
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

                set_categoryList(list);
            });
        }
        getCategories().then();

    },[])






    //Variables used to handle Modal (Popup screen for edit)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isCategoryAddViewVisible, setIsCategoryAddViewVisible] = useState(false);


    const handleCategoryAddModal = () => {
        setIsCategoryAddViewVisible(() => !isCategoryAddViewVisible)
    }

    const handleDeleteModal = async (category) => {
        // Delete that document
        await deleteDoc(doc(db,"gathering", gatheringID, "budget", category.id));
    }

    const [isCategoryEditViewVisible, setIsCategoryEditViewVisible] = useState(false);

    const handleEditModal = async (category) => {
        set_CategoryID(category.id);
        set_categoryName(category.name);
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
                    {categoryList.map((item) => (
                        <View key={item.id} style={styles.budgetContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Field', {gathering, item}, set_category(item))}>
                                <View style={styles.budget}>
                                    <View style={styles.budgetInfo}>
                                        <Text style={styles.budgetText}> {item.name}</Text>
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
                {isCategoryEditViewVisible && <EditBudgetView gathering={gathering} categoryID={categoryID} categoryName={categoryName} totalCost={totalCost}/>}
                {isCategoryAddViewVisible && <AddBudgetView gathering={gathering}/>}
            </ScrollView>
        </View>
    )
}




//Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9'
    },
    budgetContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        marginBottom: '0.2%',
    },
    budgetInfo: {
        width: '68%',
    },
    budgetText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    budget: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
