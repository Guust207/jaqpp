import {Image, Text, TouchableOpacity, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import React, {useCallback, useEffect, useState} from 'react';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from "../../firebaseConfig";
import {currentUser} from "../global_variables";
import {styles} from "../Styles";
import {useNavigation} from "@react-navigation/native";

/* API Used for fetching information about user logged-in
https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
https://docs.expo.dev/guides/google-authentication/
 */

//Function that watches for requests to use browser.
export const Login = () => {
    const [accessToken, setAccessToken] = React.useState(null);
    const [user, setUser] = currentUser();
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "766637901593-id760o157h0bieoq7eiukbbvhnbhae0h.apps.googleusercontent.com",
    });

    async function add() {
        if (!user) {
            return;
        }
        if (await check("users")) {
            await setDoc(doc(db, "users", user.id), {
                fullName: user.name,
                email: user.email,
                picture: user.picture,
            });
            console.log("User", user.name, "has been added to the database");
        }
    }
    async function check(collection) {
        if (user) {
            const docRef = doc(db, collection, user.id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return false;
            }
        }
        return true;
    }
    const [userNotLoggedIn, setUserNotLoggedIn] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        add().then();
        if (isInitialized) {
            setUserNotLoggedIn(() => !user);
        } else {
            setIsInitialized(true);
        }
    }, [user]);
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            const userData = await response.json();
            setUser(userData);
            if (userData) {
                setUserNotLoggedIn(() => !user);
            }
        } catch (error) {
            console.log("Failed!", error);
        }
    };
    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response]);
    useEffect(() => {
        if (accessToken) {
            fetchUserInfo().then();
        }
    }, [accessToken]);
    const handleLogin = useCallback(() => {
        promptAsync().then();
    }, [promptAsync]);
    return (
        <View style={styles.nonHeaderContainer}>
            <View>
                <Image style={styles.logo} source={require('../../images/logo_transparent.png')} />
                <View style={styles.googleButtonContainer}>
                    <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleLogin}>
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

