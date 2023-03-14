//Edit function
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";

export async function edit(id, gatName, gatDate, gatTime) {
    await setDoc(doc(db, "gathering", id), {
            name: gatName,
            date: gatDate,
            time: gatTime
        }
    );

}

export default {edit};
