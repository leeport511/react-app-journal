import React from 'react'
import validator from 'validator'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegister } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispach = useDispatch();

    const {msgError} = useSelector( state => state.ui);

    

    const [formValues, handleInputChange] = useForm({
      name: '',
      email: "",
      password: '',
      password2: '',
    });

    const {name, email, password, password2} = formValues;


    const handleRegister = (e) => {
      e.preventDefault();

      if ( isFormValid() ) {
        dispach (startRegister (name, email, password));
      }
      

    }

    const isFormValid = () => {

      if (name.trim().length === 0) {
        dispach(setError('Name is required'));
        return false;
      } else if (!validator.isEmail( email )) {
          dispach(setError('Email is not Valid'));
          return false;
        } else if (password !== password2 || password.length < 5) {
            dispach(setError('Password should be at least 6 characters and match with the other'));
            return false;
        }

        dispach(removeError());

      return true;
    }
   

  return (
    <>
      <h3 className="auth__title mb-5">Register</h3>

      <form 
        onSubmit={ handleRegister }
        className="animate__animated animate__fadeIn animate__fast"
      >

        {
           (msgError !== null) && <div className="auth__alert-error"> {msgError}</div>
        }

        <input
            type="text"
            placeholder="Name"
            name="name"
            className="auth__input mb-1"
            autoComplete="off"
            value = {name}
            onChange={ handleInputChange }
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input mb-1"
          autoComplete="off"
          value = {email}
          onChange={ handleInputChange }
        />

        <input
          type="Password"
          placeholder="Password"
          name="password"
          className="auth__input mb-1"
          value = {password}
          onChange={ handleInputChange }
        />

        <input
          type="Password"
          placeholder="Confirm"
          name="password2"
          className="auth__input mb-1"
          value = {password2}
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          
        >
          Register
        </button>

       

        <Link to='/auth/login' className='link'>Already Registered?</Link>



      </form>
    
    </>
  )
}
