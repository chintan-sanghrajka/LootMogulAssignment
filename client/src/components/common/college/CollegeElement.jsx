import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollegeElement = ({ college }) => {

    const navigate = useNavigate()



    return (
        <>
            <div className='college_element_container font color_dark' onClick={() => navigate(`/college-page/${college.id}`)}>
                <p className='college_element_id'>{college.id}</p>
                <p className='college_element_name'>{college.name}</p>
                <p className='college_element_rating'>{college.rating}</p>
                <p className='college_element_location'>{college.location}</p>
            </div>
        </>
    )
}

export default CollegeElement