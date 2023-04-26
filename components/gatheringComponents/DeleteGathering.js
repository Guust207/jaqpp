import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Button, StyleSheet, TextInput, View} from "react-native";
import {useEffect, useState} from "react";

const deleteGathering = async (docName) => {
    // Name of collection to delete from and reference to the wanted document inside
    const colName = "gathering";
    const docRef = doc(db, colName, docName);

    // Delete that document
    await deleteDoc(docRef);
}
/*
const DeleteView = () => {
    const [buttonText, setButtonText] = useState("");
    const [gatheringDel, setGatheringDel] = useState("");

    useEffect(() => {
        deleteGathering(gatheringDel)
            .then(() => {
                console.log("Removal successful!");
            })
            .catch(() => {
                console.log("No such document!");
            })
    }, [gatheringDel])

    return (
        <View style={styles.container}>
            <TextInput onChangeText={setButtonText} placeholder={"Gathering"} />
            <Button title="Press me!" onPress={() => setGatheringDel(buttonText.toLowerCase())}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DeleteView; */