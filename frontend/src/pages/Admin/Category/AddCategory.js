import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import AdminSidebar from '../AdminSidebar'
import { addCategory } from '../../../api/categoryAPI'
import { isAuthenticated } from '../../../api/userAPI'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const {token} = isAuthenticated()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const clickSubmit = e => {
        e.preventDefault()
        addCategory(category, token )
        .then(data=>{
            if(data.error){
                setError(data.error)
                setSuccess(false)
            }
            else{
                setSuccess(true)
                setError('')
            }
        })
    }

    const showError = () =>{
        if(error){
            return <div className='alert alert-danger'>{error}</div>
        }
    }
    const showSuccess = () => {
        if(success){
            return <div className='alert alert-success'>Category added Successfully</div>
        }
    }
  return (
    <>
     <Navbar/>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminSidebar category/>
                </div>
                <div className='col-md-9 p-5 text-start'>
                    <div className='d-flex justify-content-between w-75 mx-auto'>
                    <h3>
                        Category
                    </h3>
                    <Link to= '/admin/category' className='btn btn-primary'>Go Back</Link>
                    </div>
                    <form className='m-5 p-5 shadow w-50 mx-auto'>
                        {showError()}
                        {showSuccess()}
                        <label htmlFor='category_name'>Category Name:</label>
                        <input type={'text'} id= 'category-name' className='form-control' 
                        onChange={e=>setCategory(e.target.value)}/>
                        <button className='btn btn-warning form-control mt-3' onClick={clickSubmit}>ADD CATEGORY</button>
                    </form>
        
                </div>
            </div>

        <Footer/>
    </>
  )
}

export default AddCategory