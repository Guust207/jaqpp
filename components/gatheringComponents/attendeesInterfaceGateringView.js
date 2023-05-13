import {Text, TouchableOpacity, View, ScrollView,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, where} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

//Component Imports
import {currentFilter, currentUser} from "../global_variables";
import  {styles} from "../Styles";
import {Dropdown} from "react-native-element-dropdown";
import {Entypo} from "@expo/vector-icons";

/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const AttendeesGatheringInterface = () => {
    const navigation = useNavigation();

    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const [gatList, set_gatList] = useState([]);
    const [user, setUser] = currentUser();



    //Gather
    useEffect(() => {
        const getAllGat = async () => {
            const w = query(collection(db, "gathering"));

            onSnapshot(w, (querySnapshot) => {
                const gatheringList = [];

                querySnapshot.forEach((doc) => {
                    const {name, date, time, description} = doc.data();

                    //list for storing the data
                    gatheringList.push({
                        id: doc.id,
                        name,
                        date,
                        time,
                        description,
                    });
                });
                set_gatList(gatheringList);
            });

            const list = [];
            for (let i = 0; i < gatList.length; i++) {
                const docRef = doc(db,"gathering", gatList[i].id, "attendees", user.id);
                const docSnap = await getDoc(docRef).then();
                if (docSnap.exists()) {
                    const name = gatList[i].name
                    const date = gatList[i].date
                    const time = gatList[i].time
                    const description = gatList[i].description
                    list.push({
                        id: gatList[i].id,
                        name,
                        date,
                        time,
                        description,
                    });
                }
            }
        setGat(list);
        }
        getAllGat()

    },[user])



    console.log(gat)


    const dropdownItems = [
        { label: 'Guest Gatherings', value: 'Guest Gatherings' },
        { label: 'Own Gatherings', value: 'Own Gatherings' },
    ];

    const [value, setValue] = currentFilter();
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <TouchableOpacity >
                </TouchableOpacity>
            );
        }
        return null;
    };



    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dropdownItems}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Filter' : 'Filter'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Entypo
                                style={styles.icon}
                                name="sound-mix"
                                size={12}
                                color={isFocus ? 'black' : 'grey'}
                            />
                        )}
                    />
                    {gat.map((item) => (
                        <View key={item.id} style={styles.gatContainer}>
                            {/* i toppen skriv route og i toippen på denne skriv navigation
                        const drink = route.params.drink*/}
                            <TouchableOpacity onPress={() => navigation.navigate('CurrentAttendeesGathering', { item })}>
                                <View style={styles.gat}>
                                    <View style={styles.gatImageContainer}>
                                        <Image style={styles.gatImage}/>
                                        {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={[styles.text, styles.gatName]}> {item.name}</Text>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.infoText}> 📅{item.date}</Text>
                                            <Text style={styles.infoText}>:{item.time}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.gat}>

                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

