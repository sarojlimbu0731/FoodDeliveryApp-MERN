import React, { useEffect, useRef, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { getCategories } from '../../../api/categoryAPI'
import { addFood} from '../../../api/foodAPI'
import { isAuthenticated } from '../../../api/userAPI'
import AdminSidebar from '../AdminSidebar'


const AddFood = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [food, setfood] = useState({
        food_name:'',
        food_price:'',
        food_description:'',
        food_image:'',
        category:'',
        success:false,
        error:'',
        formData:''
    })
    const {food_name, food_price, food_description,formData, success, error} = food

    let my_ref = useRef()
    let sel_ref = useRef()
    
    const {token} = isAuthenticated()
    useEffect(()=>{
        getCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
                setfood({...food, formData:new FormData})
            }
        })
    },[])

    const handleChange = name => e => {
        e.preventDefault()
        let value = name === 'food_image' ? e.target.files[0] : e.target.value
        setfood({...food, [name]: value})
        formData.set(name, value)
    }

    const handleSubmit = (e) =>  {
        e.preventDefault()
        addFood(formData, token)
        .then(data=>{
            if(data.error){
                setfood({...food, error:data.error, success: false})
            }
            else{
                setfood({...food, success: true, food_name:'', food_price:'', food_description:'', error: ''})
                my_ref.current.value = ''
                sel_ref.current.value = ''
                navigate('/admin/foods')

            }
        })
    }

    const showError = () => {
        if(error){
            return <div className='alert alert-danger'>{error}</div>
        }
    }
    const showSuccess = () => {
        if(success){
            return <div className='alert alert-success'>food item added successfully.</div>
        }
    }

  return (
    <>
    <Navbar />
    <div className='row'>
        <div className='col-md-3'>
            <AdminSidebar foods />
        </div>
        <div className='col-md-9 p-5 text-start'>
            <div className='d-flex justify-content-between w-75'>
                <h3>
                    Add Food Item
                </h3>
                <Link to='/admin/foods' className='btn btn-primary'>Go Back</Link>

            </div>
            <div className='container'>  
            <form className='p-5 shadow mt-5 w-75'>
                {showError()}
                {showSuccess()}
                <label htmlFor='food_name'>Food Name</label>
                <input type={'text'} className='form-control mb-2' id='food_name' onChange={handleChange('food_name')} value={food_name}/>
                <label htmlFor='food_price'>food Price</label>
                <input type={'number'} className='form-control mb-2' id='food_price' onChange={handleChange('food_price')} value={food_price}/>
                <label htmlFor='desc'>Description</label>
                <textarea className='form-control mb-2' id='desc' onChange={handleChange('food_description')} value={food_description}/>
                <label htmlFor='category'>Category</label>
                <select className='form-control mb-2' id='category' onChange={handleChange('category')} ref= {sel_ref}>
                    <option></option>
                    {
                        categories.map((category,i)=>{
                            return <option key={i} value={category._id}>{category.category_name}</option>
                        })
                    }
                </select>
                <label htmlFor='food_image'>Image</label>
                <input type={'file'} id='food_image' className='form-control mb-2s' onChange={handleChange('food_image')} ref = {my_ref}/>
                
                <button className='btn btn-warning form-control mt-3' onClick={handleSubmit}>Add food</button>
                </form>          
            
            </div>


        </div>
    </div>

    <Footer />
</>
  )
}

export default AddFood