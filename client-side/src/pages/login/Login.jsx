import React, { useContext, useState } from 'react'
import "./login.scss"
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  //input buffer
  const [errMessage, setErrMessage] = useState(null)
  const [input, setInput] = useState({
    username: null,
    password: null
  })

  const navigate = useNavigate()

  //auth context consume
  const { login } = useContext(AuthContext)

  //handler
  const inputHandler= (event) => {
    setInput( prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const loginHandle = async (e) => {
    e.preventDefault()
    try {
      await login(input)
      navigate("/")
    } catch (error) {
      setErrMessage(error.response.data)
    }
  }

  return (
    <div className='body'>
      <div className="container" id="container">
	      <div className="form-container">
          <div className="form-page">
          {errMessage}
            <form action="#">
              <h1>Sign in</h1>
              <input name='username' type="text" placeholder="Username" onChange={inputHandler}/>
              <input name='password' type="password" placeholder="Password" onChange={inputHandler}/>
              <button onClick={loginHandle}>Sign In</button>
            </form>
            <a href="#" onClick={ () => {navigate("/register")}}>dont have account ?</a>
          </div>
	      </div>
      </div>
    </div>
  )
}

export default Login