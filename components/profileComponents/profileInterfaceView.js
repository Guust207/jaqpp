

//This is the function that handles profile view and all of its sub functions
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";

export const ProfileView = (user, setUser) => {

    //Function that handles the Sign-out button
    const handleLogout = () => {
        setUser(null);
    }

    const handleAccountDeletion = () => {
    }

    //The view that you see at profile view
    return (
        <View>
            <Text> {user.name} </Text>
            <Text> User information 1</Text>
            <Text> User information 2</Text>
            <Button
                title="Sign out"
                onPress={handleLogout}
            />
            <TouchableOpacity onPress={handleAccountDeletion}>
                <Text style={styles.text}> Delete my Jaq account</Text>
            </TouchableOpacity>
        </View>)
}

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
            textAlign: 'center',
            backgroundColor: 'blue'
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




