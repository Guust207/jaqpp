//Edit function
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";

export async function edit(id, Name, Date, Time) {
    await setDoc(doc(db, "gathering", id), {
            name: Name,
            date: Date,
            time: Time
        }
    );
}

export default {edit};
