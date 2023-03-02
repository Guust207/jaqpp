import {Button, Text, View} from "react-native";
import firebase from "firebase";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session';
import * as React from 'react';


//web: 915952687283-21nhi489t2rfmhrll8abb801rrfrnk6q.apps.googleusercontent.com
//android: 915952687283-ilcll2tjbofrbmf9oei3f6vclu3tkesg.apps.googleusercontent.com







const loginHandle = () => {
    const GoogleAuth = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(GoogleAuth).then();
}


export const login = () => {

    React.useEffect(() => {
        if(response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo();
        }
    }, [response, accessToken])


    const [accessToken, setAccessToken] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const [request, response, promtAsync] = Google.useAuthRequest({
        clientId: "915952687283-21nhi489t2rfmhrll8abb801rrfrnk6q.apps.googleusercontent.com"
    });

    async function fetchUserInfo () {
        let response = await fetch("https://wwww.googleleapis.com/userinfo/v2/me", {
            headers: { Authorization: 'Bearer ${accessToken}'}
        });
        const useInfo = await response.json();
        setUser(useInfo);
    }

    const ShowUserInfo = () => {
        if(user) {
            return (
                <View>
                    <Text>
                        Welcome
                    </Text>
                    <Text>
                        {user.name}
                    </Text>
                </View>
            )
        }
    }

    //What you will see when you are at Add in app
    return (
        <View>
            {user === true && <ShowUserInfo />}
            {user === null &&
                <Button title={"Sign In"} onPress={promtAsync}></Button>
            }
        </View>
    );
}