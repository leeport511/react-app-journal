import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm'
import {startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'



export const LoginScreen = () => {

  const dispach = useDispatch();

  const {loading} = useSelector( state => state.ui);

  const [ formValues, handleInputChange ] = useForm ({
    email: '',
    password: ''
  });

  const {email, password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispach( startLoginEmailPassword(email, password) );

    

  }

  const handleGoogleLogin = () => {
    dispach( startGoogleLogin() );
  }
  

  return (
    <>
      <h3 className="auth__title mb-5">Login</h3>

      <form 
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="Password"
          placeholder="password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled= {(loading === true)} 
        >
          Login
        </button>

        <hr />

        <div className="auth__social-network">
          <p><b>Login with Social Networks</b></p>
            <div 
              className="google-btn"
              onClick={handleGoogleLogin}
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <div className="google-text">
                  <p className="btn-text">
                      <b>Sign in with google</b>
                  </p>
                </div>
            </div>
        </div>

        <Link to='/auth/register' className='link'>Create a new account</Link>



      </form>
    
    </>
  )
}
