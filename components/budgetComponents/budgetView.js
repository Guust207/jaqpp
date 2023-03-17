import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from "react-native";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {budgetCategoryView} from "./budget_categoryFieldView";



export const BudgetView = () => {

    const [budgetCategory, set_budgetCategory] = useState(null);
    const gathering = "gathering55555"

    async function add_budgetCategory() {
        await setDoc(doc(db,"gathering", gathering, "budget", budgetCategory), {
            nextID: 1
            }
        ).then();
    }

    const MissingCategory = () =>
        Alert.alert('Alert!', 'Please add valid category', [
            {text: 'OK'},
        ]);

    const CategoryExist = () =>
        Alert.alert('Alert!', 'Category already exists', [
            {text: 'OK'},
        ]);

    const addBudget = () => {
        if (budgetCategory === null) {
            MissingCategory();
        } else if (doc(db,"gathering", gathering, "budget", budgetCategory)) {
            CategoryExist();
        } else
            add_budgetCategory().then();
    }

    return (
        <View>
            <TextInput
                onChangeText={set_budgetCategory}
                placeholder="food, decoration, etc"
            />
            <Button
                onPress={addBudget}
                title="Add"
            />
        </View>
    )
}

