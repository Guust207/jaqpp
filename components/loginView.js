import {Button, Text, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import {useCallback} from 'react';

/* API Used for fetching information about user logged-in
https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
 */



WebBrowser.maybeCompleteAuthSession();

export const login = () => {

    const [accessToken, setAccessToken] = React.useState(null);
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

    async function fetchUserInfo () {
        console.log(accessToken);
        //Using API to fetch information about logged-in user
        let response = await fetch("https://www.googleapis.com/userinrfo/v2/me", {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        const useInfo = await response.json();
        console.log("Type of:", typeof(response));
        setUser(useInfo);
        if(user)
            console.log("User", user.name, "connected!");
    }


    const ShowUserInfo = () => {
        if(user) {
            return (
                <View>
                    <Text>
                        Welcome
                    </Text>
                    <Text>
                        {user.user}
                    </Text>
                </View>
            )
        }
    }


    const handlerClick = useCallback(() => {
        promptAsync().then();
    }, [promptAsync])



    //What you will see when you are at Add in app
    return (
        <View>
            {user === true && <ShowUserInfo />}
            {user === null &&
                <>
                    <Text>
                    </Text>
                    <Button title={"Sign In"} disabled={!request} onPress={handlerClick}></Button>
                </>
            }
        </View>
    );
}
