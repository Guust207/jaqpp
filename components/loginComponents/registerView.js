import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Image} from 'react-native';
import { auth , db} from "../../firebaseConfig";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import {doc, getDoc, setDoc} from 'firebase/firestore';


import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {useNavigation} from "@react-navigation/native";



const RegisterInScreen = () => {
    const navigation = useNavigation();


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
                navigation.navigate('SignIn');
            })
            .catch(error => setErrorMessage(error.message));
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../images/logo.png')} />
            <Text style={styles.topText}>Register</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="UserName"

                    placeholderTextColor="#999"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#999"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={() => handleSignUp (setEmail, setPassword)}>
                    <Text style={[styles.buttonText, styles.signInButtonText]}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.newToApp}>
                <Text>Already registered? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.register}> LogIn</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.errorContainer}>
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
        </View>
    );
};


export default RegisterInScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6D5C9',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    topText: {
        fontSize: 25,
        marginBottom: 10,
        marginLeft: 10,
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
        marginBottom: -100,
        resizeMode: 'center',

    },
    welcomeMessage: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        fontSize: 18,
        marginBottom: 30,
    },
    newToApp: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },

    register: {
        color:'#AD40AF',
        fontWeight: '700',
    },

});
