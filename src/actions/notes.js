import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
import { act } from "react-dom/test-utils";



export const startNewNote = () => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        }

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

        dispatch( activeNote (docRef.id, newNote) );
        dispatch( addNewNote (docRef.id, newNote) );

    }
}


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.addNewNote,
    payload: {
        id, ...note
    }
})


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}



export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNotes = ( note ) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);

        dispatch( refreshNotes(note.id, note ) )
        Swal.fire('Saved', note.title, 'success')

    }
}


export const refreshNotes = (id, note) =>( {
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id, 
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {

        const {active:note} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text:'Please Wait...',
            allowOutsideClick: false,
            showClass: {
                popup: 'swal2-show',
                backdrop: 'swal2-backdrop-show',
                icon: 'swal2-icon-show'
              },
              didOpen: () => {
                  Swal.showLoading();
              }
        })

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        const updatedNote = {...note, url:fileUrl}; // updateo mi nota q no tenia el url

        dispatch ( startSaveNotes (updatedNote) );
        dispatch (activeNote(note.id, updatedNote));

        Swal.close();
    }
}


export const startDeleting = ( id ) => {
    return async (dispatch, getState) => {

        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            const uid = getState().auth.uid;
            const noteRef = doc(db, `${uid}/journal/notes/${id}`);
                deleteDoc(noteRef);
    
            
            dispatch(deleteNote(id));
        }
        })

        
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
});


//react-journal