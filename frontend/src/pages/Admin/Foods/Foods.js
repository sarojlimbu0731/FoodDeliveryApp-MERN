import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { API } from '../../../config'
import { getFoods} from '../../../api/foodAPI'
import AdminSidebar from '../AdminSidebar'


const Foods = () => {
    const [foods, setfoods] = useState([])

    useEffect(()=>{
        getFoods()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setfoods(data)
            }
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <>
    <Navbar />
    <div className='row'>
        <div className='col-md-3'>
            <AdminSidebar foods />
        </div>
        <div className='col-md-9 p-5 text-start'>
            <div className='d-flex justify-content-between'>
                <h3>
                    Foods
                </h3>
                <Link to='/admin/food/add' className='btn btn-primary'>Add Food Item</Link>

            </div>
            <div className='container'>            
            <table className='table table-hover table-striped text-center p-3 my-5 shadow'>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Food Image</th>
                        <th>Food Name</th>
                        <th>Unit Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foods.map((food,i)=>{
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td>
                                    <img src={`${API}/${food.food_image}`} style={{height:'75px'}}/>
                                </td>
                                <td><h4>{food.food_name}</h4></td>
                                <td><h4>Rs.{food.food_price}</h4></td>
                                <td>
                                    <div className='btn-group'>
                                        <Link to={`/admin/food/update/${food._id}`} className='btn btn-warning'><i className='bi bi-pencil'/></Link>
                                        <Link to={`/admin/food/delete/${food._id}`} className='btn btn-danger'><i className='bi bi-trash'/></Link>
                                    </div>
                                </td>

                            </tr>
                        })
                    }
                   
                </tbody>
            </table>
            </div>
        </div>
    </div>

    <Footer />
</>
  )
}

export default Foods