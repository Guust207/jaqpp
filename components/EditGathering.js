//Edit function
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";

export async function edit(id, fName, lName, DOB, className, score, grade) {
    await setDoc(doc(db, "students", id), {
            firstName: fName,
            lastName: lName,
            DOB: DOB,
            className: className,
            score: score,
            grade: grade
        }
    );
}

export default {edit};
