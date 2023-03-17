import {Button, TextInput, View} from "react-native";
import React, {useState} from "react";
import {db} from "../../firebaseConfig";
import {doc, setDoc} from "firebase/firestore";


export const budgetCategoryView = () => {

    const [fieldName, set_fieldName] = useState("");
    const [fieldCost, set_fieldCost] = useState("");
    const [fieldAmount, set_fieldAmount] = useState("");
    //const [budgetCategory, set_budgetCategory] = useState("")

    //Dummy values
    const budgetCategory = "Food"
    const gathering = "gathering55555"


    async function increaseID(value) {
        await setDoc(doc(db, 'gathering', 'gathering25381').collection('budget').doc(budgetCategory), {
                nextID: value
            }
        ).then();
    }


    async function add_CategoryField() {

        await setDoc(doc(db,"gathering", gathering, "budget", budgetCategory, "ListOf" + budgetCategory, fieldName), {
            name: fieldName,
            costPrUnit: fieldCost,
            amount: fieldAmount,
            totalCost: fieldAmount * fieldCost
            }
        );
    }


    return (
        <View>
            <TextInput
                onChangeText={set_fieldName}
                placeholder="Name"
            />
            <TextInput
                onChangeText={set_fieldCost}
                placeholder="Cost Pr Unit"
            />
            <TextInput
                onChangeText={set_fieldAmount}
                placeholder="Amount"
            />
            <Button
                onPress={add_CategoryField}
                title="Add Field"
            />
        </View>
    )
}