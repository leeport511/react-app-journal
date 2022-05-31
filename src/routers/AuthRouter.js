import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
  return (
    <>
    <div className="auth-clip-path"></div>
      <div className="auth__main">
        <div className="auth__box-container">
          <Routes>
                      
              <Route path="login" element={<LoginScreen /> } />

              <Route path="register" element={<RegisterScreen /> } />

              <Route path='*' element={<Navigate to="login" replace />} />
              
          </Routes>

        </div>

      </div>
    </>

  )
}
