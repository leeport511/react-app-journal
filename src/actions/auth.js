import { firebaseApp, googleAuthProvider } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { noteLogout } from "./notes";



export const startLoginEmailPassword = (email , password) => {
    return (dispatch) => {
        dispatch (startLoading());
       const auth = getAuth(firebaseApp);
       signInWithEmailAndPassword(auth, email, password)
       .then(({user}) => {
           
           dispatch( login(user.uid, user.displayName) );
           dispatch(finishLoading());
           
       }). catch(err => {
            console.log(err);
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The Email or Password are wrong, please try again',
              })
        });

        

    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth(firebaseApp);
        signInWithPopup (auth, googleAuthProvider)
            .then(({user}) => {
                dispatch( login(user.uid, user.displayName))
            });
    }
}


export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName,
        }
    }
}

export const startRegister= (name, email, password) => {
    return (dispatch) => {
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword (auth, email, password )
            .then( async ({user}) => {

                await updateProfile(user, {displayName: name} );

                
                dispatch( login(user.uid, user.displayName))
            })
            .catch(e => { 
                console.error(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mail is already registered',
                  }) 
            } )

    }
}

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth(firebaseApp);
        await signOut(auth);
    
            dispatch( logout() );
            dispatch(noteLogout());

    }
}

export const logout = () => ({ 
    type: types.logout,
})