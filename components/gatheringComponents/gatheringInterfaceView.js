import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView,  TextInput,  Image} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, doc, getDoc, query, onSnapshot, setDoc, where, deleteDoc} from "firebase/firestore";
import { auth , db} from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import {Dropdown} from "react-native-element-dropdown";
import { Entypo } from '@expo/vector-icons';


//Component Imports
import Create from "./CreateGathering";
import {currentUser, currentFilter} from "../global_variables";
import {styles} from "../Styles";


/*
OBS!!!!!!
Edit og Delete skal være tilgjengelig når du klikker på en av gatheringene
 */
export const GatheringInterface = () => {
    const navigation = useNavigation();



    //Get part
    // This is variables and functions for fetching and display all the gatherings
    const [gat, setGat] = useState([]);
    const [user, setUser] = currentUser();



    useEffect(() => {
        const getAllGat = async () => {
            const q = query(collection(db, "gathering"), where("userID", "==", user.id));
            onSnapshot(q, (querySnapshot) => {
                const  list = [];

                querySnapshot.forEach((doc) => {
                    const {name, date, time, description} = doc.data();

                    //list for storing the data
                    list.push({
                        id: doc.id,
                        name,
                        date,
                        time,
                        description,
                    });
                });

                setGat(list);
            });
        }
        getAllGat();

    },[user])



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
                            <TouchableOpacity onPress={() => navigation.navigate('CurrentGathering', { item })}>
                                <View style={styles.gat}>
                                    <View style={styles.gatImageContainer}>
                                        <Image style={styles.gatImage}/>
                                        {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={[styles.text, styles.gatName]}> {item.name}</Text>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.text}> 📅{item.date}</Text>
                                            <Text style={styles.text}>:{item.time}</Text>
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



