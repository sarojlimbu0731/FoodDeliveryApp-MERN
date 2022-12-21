import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CategorySeclect from '../components/CategorySeclect'
import FoodModal from '../components/FoodModal'
import { HomeTotalTag } from '../components/HomeTotalTag'
import { getFilteredFoods } from '../api/foodAPI'
import { SiCodechef } from 'react-icons/si';
import { CiLocationOn } from 'react-icons/ci';
import './home.css'




const Home = () => {
    const [search, setSearch] = useState('')
    const [foods, setFoods] = useState([]);

    const [categoryId, setcategoryId] = useState('')
    const [filteredfood, setfilteredfood] = useState([])

    const [foodDetail, setfoodDetail] = useState({})

    useEffect(() => {
        getFilteredFoods(categoryId)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setfilteredfood(data)
                }
            })
    }, [categoryId])

    useEffect(() => {
        setFoods(filteredfood.filter(item => item.food_name.toUpperCase().match(search.toUpperCase())))
    }, [search])

    const handleFilter = (filters) => {
        setcategoryId(filters)
    }

    const renderFoodModal = (e) => {
        e.preventDefault()
        setfoodDetail(filteredfood.find(item => item._id === e.target.value))
    }
 
    return (
        <>
            <Navbar />
            <div className='bg-dark' style={{ backgroundImage: `url("./coverimage4.jpeg")` }} id="homemain">
                <div className='text-white text-start' id="homeinfo">
                    <h1>Burger House</h1>
                    <h5><SiCodechef />Continental</h5>
                    <h5><CiLocationOn /> New Baneshwor</h5>
                    <p className='text-success mt-2'>MINIMUM ORDER:RS.500</p>
                </div>
            </div>
            <div className='row my-5 mx-5 py-5'>
                <div className='col-2'>
                    <CategorySeclect handleFilter={handleFilter} />
                </div>
                <div className='col-7'>
                    <div className=''>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 mb-4 border border-warning text-success"
                                type="search" placeholder="Search food item" aria-label="Search" onChange={e => setSearch(e.target.value)} />
                        </form>
                    </div>
                    <div className="list-group">

                        {search ?
                            foods.map((food, i) => {
                                return <button key={i} type="button" className="list-group-item list-group-item-action text-success fs-5"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={renderFoodModal}
                                    value={food._id}>{food.food_name} {food.food_price}</button>
                            }) :
                            filteredfood.map((food, i) => {
                                return <button key={i} type="button" className="list-group-item list-group-item-action text-success fs-5"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={renderFoodModal}
                                    value={food._id}>{food.food_name} {food.food_price}</button>
                            })
                        }
                    </div>

                </div>
                <div className='col-3 shadow-sm'>
                    <h3>TOTAL:</h3>
                    <HomeTotalTag />
                </div>
            </div>

            <FoodModal foodDetail={foodDetail} />
            <Footer />
        </>
    )
}

export default Home