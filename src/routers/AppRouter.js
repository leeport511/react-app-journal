import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
import Swal from "sweetalert2";




export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const auth = getAuth(firebaseApp);

    onAuthStateChanged( auth, async (user) => {

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));

      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);

    })
    
  }, [dispatch, setChecking, setIsLoggedIn]);

  const showLoadingSA = () => {
    
    Swal.fire({
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
  setTimeout(() => {
    Swal.close();

  }, 1000); 
        
  }


  if (checking) {
    return (
      <div className="loading__page">
        <span>{showLoadingSA()}</span>

      </div>
    )
  }
  



  return (
    <>
        <BrowserRouter>
            
                <Routes>
                    
                    <Route 
                        path="/auth/*" 
                        element={
                          <PublicRoute isAuth={isLoggedIn}>
                              <AuthRouter /> 
                          </PublicRoute>
                        } />
                            

                    <Route 
                        path="/" 
                        element={
                          <PrivateRoute isAuth={isLoggedIn}>
                              <JournalScreen /> 
                          </PrivateRoute>
                        } />


                    <Route path="*" element={<Navigate replace to="/auth/" />} />
                    
                </Routes>
        </BrowserRouter>
    </>
  )
}
