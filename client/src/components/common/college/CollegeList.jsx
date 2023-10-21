import React from 'react'
import CollegeElement from './CollegeElement.jsx'

const CollegeList = ({ collegeList }) => {
    return (
        <div>
            {collegeList.length === 0 && <p className='data_not_found font color_dark'>No Colleges Found.</p>}

            {
                collegeList.length !== 0 &&
                <>
                    <div className='college_list_container'>

                        <div className='college_element_container font color_dark'>
                            <p className='college_element_id'>Id</p>
                            <p className='college_element_name'>Name</p>
                            <p className='college_element_rating'>Rating</p>
                            <p className='college_element_location'>Location</p>
                        </div>

                        {
                            collegeList.map((college, index) => {
                                return <CollegeElement college={college} key={index} />
                            })}
                    </div>
                </>
            }
        </div>
    )
}

export default CollegeList