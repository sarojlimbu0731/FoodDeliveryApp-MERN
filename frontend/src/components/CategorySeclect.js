import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/categoryAPI'
import './CategorySelect.css'

const CategorySeclect = ({ handleFilter }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
    }, [])

    const handleChange = (e) => {
        handleFilter(e.target.value)
    }
    return (
        <>
            <h4>Categories</h4>
            {
                categories.map((category, i) => {
                    return <div className="form-check" key={i}>
                        <input className="form-check-input mt-1 me-2" type="radio" name="flexRadioDefault" id={`flexRadioDefault1${i}`} onChange={handleChange} value={category._id} />
                        <label className="form-check-label text-success font-weight-bold fs-5" htmlFor={`flexRadioDefault1${i}`}>
                            {category.category_name}
                        </label>
                    </div>
                })
            }

        </>
    )
}

export default CategorySeclect