import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import {useCallback} from 'react';

/* API Used for fetching information about user logged-in
https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
https://docs.expo.dev/guides/google-authentication/
 */



WebBrowser.maybeCompleteAuthSession();

export const login = () => {

    const [accessToken, setAccessToken] = React.useState("r");
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "766637901593-id760o157h0bieoq7eiukbbvhnbhae0h.apps.googleusercontent.com",
    });

    React.useEffect(() => {
        if(response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo().then();
        }
    }, [response, accessToken])

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
            }
        } catch (error) {
            console.log("Failed!");
        }
    };


    const handlerLogin = useCallback(() => {
        promptAsync().then();
    }, [promptAsync])

    const handleLogout = () => {
        setUser(null);
    }

    const loggedInView = () => {
        return (
            <View>
                <Text style={styles.text}> {user.name} </Text>
                <Button
                    title="Sign out"
                    disabled={!request}
                    onPress={handleLogout}
                />
            </View>)
    }



    //What you will see when you are at Add in app
    return (
        <View style={styles.container}>
            {user === null ? (
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={handlerLogin}
                />
            ) : loggedInView()}
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
