import React, { useState } from 'react'
import "./register.scss"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

  const [errMessage, setErrMessage] = useState(null)
  const [input, setInput] = useState({
    username: null,
    email: null,
    password: null,
    name: null
  })
  
  const navigate = useNavigate()
  const registerURL = "http://localhost:3030/authentication/register"

  const inputHandler = (event) => {
    setInput( prev => ({ ...prev, [event.target.name]: event.target.value }))
  } 

  const clickHandler = async event => {
    event.preventDefault()
    try {
      await axios.post(registerURL, input)
      navigate("/login")
    } catch (error) {
      setErrMessage(error.response.data)
    }
  }


  return (
    <div className='body'>
        <div className="container" id="container">
            <div className="form-container sign-in-container">
              <div className="form-page">
                <form action="#">
                  {errMessage}
                  <h1>Sign up</h1>
                  <input onChange={inputHandler} name='email' type="email" placeholder="Email" />
                  <input onChange={inputHandler} name='username' type="username" placeholder="Username" />
                  <input onChange={inputHandler} name='password' type="password" placeholder="Password" />
                  <button onClick={clickHandler}>Register</button>
                </form>
                <a href="#" onClick={ () => {navigate("/login")}}>have account ?</a>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register