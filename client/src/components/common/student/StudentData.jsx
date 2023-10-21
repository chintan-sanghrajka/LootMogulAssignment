import React from 'react'

const StudentData = ({ studentData }) => {
    return (
        <>
            {
                studentData !== undefined &&
                <div className='student_data_container font'>
                    <h2 className='student_data_heading font color_dark'>{studentData.name}</h2>
                    <div className='color_medium student_data_details_container'>
                        <p>Student Id - {studentData.id}</p>
                        <p>College - {studentData.collegeName} ({studentData.collegeId})</p>
                        <p>Date of Birth - {studentData.dateOfBirth}</p>
                        <p>Batch - {studentData.batch}</p>
                        <p>Skills</p>
                    </div>
                    <div className='student_data_course_container'>
                        {studentData.skills.map((skill, index) => {
                            return <p className='student_data_course color_medium' key={index}>{index + 1} - {skill}</p>
                        })}
                    </div>
                </div>
            }

        </>
    )
}

export default StudentData