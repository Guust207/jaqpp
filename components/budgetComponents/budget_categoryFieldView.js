import {Button, TextInput, View} from "react-native";
import React, {useState} from "react";
import {db} from "../../firebaseConfig";
import {doc, setDoc} from "firebase/firestore";


export const budgetCategoryView = () => {

    const [fieldName, set_fieldName] = useState(null);
    const [fieldCost, set_fieldCost] = useState(null);
    const [fieldAmount, set_fieldAmount] = useState(null);

    //TODO: When creating an interface you need to find a way to get budgetCategory and gathering - Currently the function is using dummy values
    const budgetCategory = "Food"
    const gathering = "gathering55555"


    async function increase_totalCost(value) {
        await setDoc(doc(db,"gathering", gathering, "budget", budgetCategory), {
                totalCost: +value
            }
        ).then();
    }

    const calculate_totalCost = () => {
        return (fieldAmount*fieldCost);
    }

    const button = () => {
        add_CategoryField().then();
        increase_totalCost(calculate_totalCost()).then();
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
                onPress={button}
                title="Add Field"
            />
        </View>
    )
}
