import {ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {currentGathering, currentUser} from "../global_variables";
import { useNavigation } from '@react-navigation/native';

import { styles } from "../Styles";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebaseConfig";

export const AttendeesGatheringView = ({route}) => {

    const [CurrentGathering, setCurrentGathering] = currentGathering();


    const navigation = useNavigation();
    const { item } = route.params;
    const [user, setUser] = currentUser();

    useEffect(() => {
        setCurrentGathering(item)
    }, [item]); // Pass user and isInitialized as dependency array

    //Edit part
    //Variables and functions that handles the edit part
    const [id, set_id] = useState(item.id);
    const [Name, set_Name] = useState(Name);
    const [Date, set_Date] = useState(Date);
    const [Time, set_Time] = useState(Time);
    const [Description, set_Description] = useState(Description);
    const [categoryList, set_categoryList] = useState([]);


    useEffect(() => {
        const getCategories = async () => {

            const q = query(collection(db, "gathering", CurrentGathering.id, "budget"));
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




    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.gatheringInformation}>
                    <Text style={styles.headText}>Gathering Information</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Text style={styles.descriptionText2}>Date - {item.date}, Time - {item.time}</Text>
                    <Text style={styles.headText}>Categories</Text>
                    <View style={styles.categoryInfoContainer}>
                        {categoryList.map((item) => (
                            <View key={item.id}>
                                <View style={styles.categoryInfo}>
                                    <Text style={styles.infoText}>{item.name} - {item.totalCost} kr</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}
