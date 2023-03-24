import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { auth , db} from "../firebaseConfig";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import {doc, getDoc, setDoc} from 'firebase/firestore';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';



const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const [user, setUser] = useState(null);

    //Google part
    //Function that watches for requests to use browser.
    WebBrowser.maybeCompleteAuthSession();

    //This is the function that handles login and how the loginView should look like.

    //Use states that are used to complete different task such as setting accessToken, user etc.
    const [accessToken, setAccessToken] = React.useState("r");
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "766637901593-id760o157h0bieoq7eiukbbvhnbhae0h.apps.googleusercontent.com",
    });






    const handleSignUp  = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User signed up successfully:');
            })
            .catch(error => setErrorMessage(error.message));
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('User signed in successfully:');
                //sendEmailVerification(auth.currentUser)
                    //.then(() => {
                        // Email verification sent!
                        // ...
                    //});
                // Navigate to home screen or do something else
            })
            .catch(error => setErrorMessage(error.message));
    };


    const handleLogOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out successfully');
        }).catch((error) => {
            console.log('Error signing out:', error);
        });
    };





    //Function that is run before adding the student to database. It checks if a user with the same id already exists.
    async function add() {
        if (user) {
            await setDoc(doc(db,"users", user.id), {
                    fullName: user.name,
                    email: user.email,
                    picture: user.picture
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



    //This is the function that handles profile view and all of its sub functions
    const profileView = (user, setUser) => {

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
                    color={'red'}
                    onPress={handleLogout}
                />
            </View>)
    }


    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    if (user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, {user.email}!</Text>
                <Button title="Sign Out" color={'purple'} onPress={handleLogOut} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                <Button title="Sign Up" onPress={() => handleSignUp (setEmail, setPassword)} />
                <Button title="Sign In" onPress={() => handleSignIn(email, password)} />
                <Text style={styles.text}>Or login with</Text>
                <Button title="Sign in with Google" disabled={!request} onPress={handlerLogin}/>
            </View>
        );
    }
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});




export default SignInScreen;
