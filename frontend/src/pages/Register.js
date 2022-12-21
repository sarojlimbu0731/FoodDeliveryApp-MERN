import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { userRegister } from '../api/userAPI'
import { FaFacebookSquare} from 'react-icons/fa';
import {FcGoogle } from 'react-icons/fc';


const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { username, email, password } = user
  const handleChange = name => e => {
    setUser({ ...user, [name]: e.target.value })
  }

  const handleRegister = e => {
    e.preventDefault()
    userRegister(user)
      .then(data => {
        console.log(data)
        if (data.error) {
          setError(data.error)
        }
        else {
          setSuccess("User registered Successfully.")
          setError('')
          setUser({ username: '', email: '', password: '', error: '' })
        }
      })
  }

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }

  const showSuccess = () => {
    if (success) {
      return <div className='alert alert-success'>{success}</div>
    }
  }

  return (
    <>
      <Navbar />
      <div className='row'
        style={{ backgroundImage: `url("./login5.jpg")` }}>
        <div className='col-6 text-white'>

        </div>
        <div className='col-6 shadow my-5'>
          <main className="form-signin w-75 m-auto mx-auto my-5 p-5">
            <form>
              <h1 className="h3 mb-3 fw-normal text-white">Register</h1>
              {showError()}
              {showSuccess()}
              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="floatingInputfname" placeholder="first" onChange={handleChange('username')} value={username} />
                <label htmlFor="floatingInputfname">User Name</label>
              </div>

              <div className="form-floating mb-2">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('email')} value={email} />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-2">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange('password')} value={password} />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="checkbox mb-3 text-white">
                <label>
                  <input type="checkbox" value="remember-me" /> I accept the terms and conditions.
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleRegister}>Register</button>
              <p className='text-white my-3'>Or Register Using</p>
              <div className='row'>
                <div className='col-6'>
                  <button className='w-75 btn btn-warning'><FcGoogle />Google</button>
                </div>
                <div className='col-6'>
                  <button className='w-75 btn btn-primary'><FaFacebookSquare />Facebook</button>
                </div>
              </div>

              <p className='text-white'>I already have an account.</p>
              <Link to='/login'>Sign in</Link>
              <p className="mt-4 mb-3 text-muted">&copy; 2017–2022</p>
            </form>
          </main>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register