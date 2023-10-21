import React from 'react'

const CollegeData = ({ collegeData }) => {
    return (
        <>
            {
                collegeData !== undefined &&
                <div className='college_data_container font'>
                    <h2 className='college_data_heading font color_dark'>{collegeData.name}</h2>
                    <div className='color_medium college_data_details_container'>
                        <p>College Id - {collegeData.id}</p>
                        <p>Founded in - {collegeData.yearFounded}</p>
                        <p>Rating - {collegeData.rating}</p>
                        <p>Location - {collegeData.location}</p>
                        <p>State - {collegeData.state}</p>
                        <p>No of Students - {collegeData.noOfStudents}</p>
                        <p>Courses Offered</p>
                    </div>
                    <div className='college_data_course_container'>
                        {collegeData.courses.map((course, index) => {
                            return <p className='college_data_course color_medium' key={index}>{index + 1} - {course}</p>
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default CollegeData