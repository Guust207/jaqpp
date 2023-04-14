

//This is the function that handles profile view and all of its sub functions
import {Button, Text, View} from "react-native";
import * as React from "react";

export const ProfileView = (user, setUser) => {

    //Function that handles the Sign-out button
    const handleLogout = () => {
        setUser(null);
    }

    //The view that you see at profile view
    return (
        <View>
            <Text> {user.name} </Text>
            <Button
                title="Sign out"
                onPress={handleLogout}
            />
        </View>)
}



