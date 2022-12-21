import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { resetPassword } from '../api/userAPI'


const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { token } = useParams()

    const handleSubmit = e => {
        e.preventDefault()
        resetPassword(password, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(data.message)
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
            {showError()}
            {showSuccess()}
            {
                !success &&
                <form className='my-5 w-25 mx-auto p-5 shadow'>
                    <label htmlFor='pwd'>New Password:</label>
                    <input type={'text'} id='pwd' className='form-control' onChange={e => setPassword(e.target.value)} />
                    <button className='btn btn-warning mt-3' onClick={handleSubmit}>Change Password</button>
                </form>
            }
            <Footer />
        </>
    )
}

export default ResetPassword