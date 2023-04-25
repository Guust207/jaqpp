import React, {useCallback, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "./components/Modal";
import {Gathering} from "./components/gatheringComponents/Gathering";
import {ProfileView} from "./components/profileComponents/profileInterfaceView";
import {currentUser} from "./components/global_variables";
import {db} from "./firebaseConfig";
import {doc, getDoc, setDoc} from "firebase/firestore";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import SignInScreen from "./components/loginComponents/signInView";

import {Login} from "./components/loginComponents/loginView";
import Create from "./components/gatheringComponents/CreateGathering";


import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';



import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseConfig";





const App = () => {



    /* API Used for fetching information about user logged-in
    https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
    https://docs.expo.dev/guides/google-authentication/
     */

    //Function that watches for requests to use browser.
    WebBrowser.maybeCompleteAuthSession();


    //This is the function that handles login and how the loginView should look like.

    //Use states that are used to complete different task such as setting accessToken, user etc.
    const [accessToken, setAccessToken] = React.useState("r");
    const [user, setUser] = currentUser();
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

    const [UserNotLoggedIn, SetUserLoggedIn] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
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


    //The navigation bar that you see at the bottom
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                navigator.reset({
                    index: 0,
                    routes: [{ name: 'signInView' }],
                });

            }
        });

    }, []);


    if (user == null) {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="login" size={24}login color="black" />
                            ),
                        }}
                    />
                </Tab.Navigator>
                <View>
                    <Modal isVisible={UserNotLoggedIn} >
                        <View style={styles.googleButtonContainer}>
                            <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handlerLogin}>
                                <Text style={[styles.buttonText, styles.googleButtonText]}>Sign in with Google</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        component={SignInScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="home" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Create"
                        component={Gathering}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="duplicate-outline" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="profile"
                        component={ProfileView}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" size={24} color="black" />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}



export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6D5C9',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        color: '#333',
        fontSize: 16,
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
    signInButton: {
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
    signInButtonText: {

    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginTop20: 20,
        alignItems: 'center',

    },
    googleButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#333',
    },
    googleButton: {
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#D6D5C9',
    },
    space: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop20: 10,
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        marginTop: '-40%',
        marginBottom: -70,
        resizeMode: 'center',

    },
    welcomeMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        fontSize: 18,
        marginBottom: 30,
    },

});



