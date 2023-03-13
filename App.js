import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {doc, deleteDoc } from "firebase/firestore";
import {db} from "./firebaseConfig";

const deleteGathering = async (docName) => {
  const colName = "gathering";
  const docRef = doc(db, colName, docName);

  await deleteDoc(docRef);
}

export default function App() {
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
