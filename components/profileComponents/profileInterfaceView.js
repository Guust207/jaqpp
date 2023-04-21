

//This is the function that handles profile view and all of its sub functions
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
            <Image style={styles.image} source={{ uri: user.picture }} />
            <Text style={styles.message}>{user.name}</Text>
            <Text style={styles.message}>{user.email}</Text>
            <Button style={styles.button} title="Sign out" onPress={handleLogout} />
        </View>
    );
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
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            backgroundColor: '#0A100D',
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
            flex: 1,
            marginHorizontal: 5,
        },
        name: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        image: {
            width: 200,
            height: 200,
        },
        bioContainer: {
            marginBottom: 20,
        },
        message: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        bio: {
            fontSize: 16,
            lineHeight: 24,
        },
    }
)




