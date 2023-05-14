import {Image, Text, TouchableOpacity, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import React, {useCallback, useEffect, useState} from 'react';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from "../../firebaseConfig";
import {currentUser} from "../global_variables";
import {styles} from "../Styles";

/* API Used for fetching information about user logged-in
https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
https://docs.expo.dev/guides/google-authentication/
 */

//Function that watches for requests to use browser.
WebBrowser.maybeCompleteAuthSession();


//This is the function that handles login and how the loginView should look like.
export const Login = () => {

    //This is the function that handles login and how the loginView should look like.

    //Use states that are used to complete different task such as setting accessToken, user etc.
    const [accessToken, setAccessToken] = React.useState("r");
    const [user, setUser] = currentUser();
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "766637901593-id760o157h0bieoq7eiukbbvhnbhae0h.apps.googleusercontent.com",
    });

    //Function that is run before adding the student to database. It checks if a user with the same id already exists.
    async function add() {
        if (user === null)
            return;
        if (user === undefined) {
            return;
        }
        console.log("HALLA")
        if (check("users").then()) {
            await setDoc(doc(db,"users", user.id), {
                fullName: user.name,
                email: user.email,
                picture: user.picture,
            })
            console.log("User", user.name, "has been added to database")
        }
    }

    async function check(collection) {
        if (user) {
            const docRef = doc(db, collection, user.id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return false;
            }
        } else {
            return true;
        }
    }

    const [UserNotLoggedIn, SetUserLoggedIn] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        add().then();
        // Check if user is not null and app has been initialized
        if (isInitialized) {
            SetUserLoggedIn(() => !UserNotLoggedIn);
        } else {
            // Set isInitialized to true after the first render
            setIsInitialized(true);
        }
    }, [user]); // Pass user and isInitialized as dependency array


//Function that fetches information about logged-in user using access token.
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const user = await response.json();
            setUser(user);
            if(user){
                SetUserLoggedIn(() => !UserNotLoggedIn)
            }
        } catch (error) {
            console.log("Failed!");
        }
    };





    //A React function that triggers when there is a response from above the fetchUserInfo function
    React.useEffect(() => {
        if(response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo().then();
        }
    }, [response, accessToken])




    //Function that handles the Sign in with Google button
    const handlerLogin = useCallback(() => {
        promptAsync().then();
    }, [promptAsync])



    //What you will see when you first come open the app
    return (
        <View style={styles.nonHeaderContainer}>
            <View>
                <Image style={styles.logo} source={require('../../images/logo_transparent.png')} />
                <View style={styles.googleButtonContainer}>
                    <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handlerLogin}>
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}




