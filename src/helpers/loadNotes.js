import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const loadNotes = async ( uid ) => {

    const dataRef = await getDocs(collection(db, `${uid}/journal/notes`));
    const notes = [];

    dataRef.forEach ( dataSon => {
        notes.push({
            id: dataSon.id,
            ...dataSon.data()
        })
    })

   

    return notes;

}