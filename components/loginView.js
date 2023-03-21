import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import {useCallback} from 'react';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from "../firebaseConfig";
import {NavigationContainer} from "@react-navigation/native";
import Create from "./CreateGathering";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* API Used for fetching information about user logged-in
https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
https://docs.expo.dev/guides/google-authentication/
 */


//Function that watches for requests to use browser.
WebBrowser.maybeCompleteAuthSession();


//This is the function that handles login and how the loginView should look like.
export const login = () => {

    //Use states that are used to complete different task such as setting accessToken, user etc.
    const [accessToken, setAccessToken] = React.useState("r");
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "766637901593-id760o157h0bieoq7eiukbbvhnbhae0h.apps.googleusercontent.com",
    });




    //Function that is run before adding the student to database. It checks if a user with the same id already exists.

    async function add() {
        if (user) {
            await setDoc(doc(db,"users", user.id), {
                    fullName: user.name,
                    email: user.email,
                    picture: user.picture,


                }
            );
        } else
        {
            add().then();
        }
    }

    async function check(collection) {
        if (user) {
            const docRef = doc(db, collection, user.id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                add(user).then();
            }
        } else {
        }
    }

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
                console.log(user.name);
                console.log(user.id);
                check("users",user).then();
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
        <View style={styles.container}>
            {user === null ? (
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={handlerLogin}
                />
            ) : profileView(user, setUser)}
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});


//This is the function that handles profile view and all of its sub functions
const profileView = (user, setUser) => {
    const Tab = createBottomTabNavigator();

    //Function that handles the Sign-out button
    const handleLogout = () => {
        setUser(null);
    }

    //The view that you see at profile view
    return (
        <View>
            <Text style={styles.text}> {user.name} </Text>
            <Button
                title="Sign out"
                onPress={handleLogout}
            />
        </View>)
}


