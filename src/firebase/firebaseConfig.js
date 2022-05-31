import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider} from 'firebase/auth';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC49y7Xf2_9OdXNyARJ4DAsTwUCyIqtbuU",
    authDomain: "react-app-637dd.firebaseapp.com",
    projectId: "react-app-637dd",
    storageBucket: "react-app-637dd.appspot.com",
    messagingSenderId: "344177518384",
    appId: "1:344177518384:web:cd1877ee7e28af0593caf5"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);


  const db = getFirestore();

  const googleAuthProvider = new GoogleAuthProvider();

  export {
      firebaseApp,
      db,
      googleAuthProvider
  }
