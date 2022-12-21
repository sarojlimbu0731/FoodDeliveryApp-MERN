import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userConfirmation } from '../api/userAPI'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const ConfirmEmail = () => {
    const params = useParams()
    const token = params.token
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        userConfirmation(token)
        .then(data => {
            if (data.error) {
                setError(data.error)
                setSuccess('')
            }
            else {
                setSuccess(true)
                setError('')
            }
        })
        .catch(error => console.log(error))

    },[])
    

    const showError = () => {
        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>User Verified Successfully.</div>
        }
    }


    return (
        <>
            <Navbar />
            {showError()}
            {showSuccess()}
            <Footer />

        </>
    )
}

export default ConfirmEmail