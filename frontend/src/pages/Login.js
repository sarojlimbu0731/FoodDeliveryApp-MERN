import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { authenticate, isAuthenticated, signin } from '../api/userAPI'
import { FaFacebookSquare} from 'react-icons/fa';
import {FcGoogle } from 'react-icons/fc';



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { user } = isAuthenticated()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    signin(email, password)
      .then(data => {
        if (data.error) {
          setError(data.error)
        }
        else {
          authenticate(data)
          setSuccess(true)

        }
      })
      .catch(err => console.log(err))
  }

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }
  const redirect = () => {
    if (success) {
      if (user && user.role === 0) {
        navigate('/')
      }
      else if (user && user.role === 1) {
        navigate('/admin/orders')
      }
      else {
        return
      }
    }
  }


  return (
    <>
      <Navbar />
      <div className='row' 
      style={{backgroundImage: `url("./login5.jpg")`}}>
        <div className='col-6 text-white'>
        
        </div>
        <div className='col-6 shadow my-5'>
        <main className="col-6 form-signin mx-auto  w-75 my-5" >
          <form>
            {showError()}
            {redirect()}
            <h1 className="h3 mb-3 fw-normal text-white">Login</h1>

            <div className="form-floating mb-2">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-2">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3 text-white">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>
            <p className='text-white my-3'>Or Login Using</p>
            <div className='row'>
              <div className='col-6'>
                  <button className='w-75 btn btn-warning'><FcGoogle/>Google</button>
              </div>
              <div className='col-6'>
              <button className='w-75 btn btn-primary'><FaFacebookSquare/>Facebook</button>
              </div>
            </div>
            <Link to='/forgetpassword' className='text-white'>Forget Password</Link><br />
            <p className='text-white'>Don't have account? </p>
            <Link to='/register'>Register</Link>
            <p className="mt-3 mb-3 text-muted">&copy; 2017–2022</p>
          </form>
        </main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login