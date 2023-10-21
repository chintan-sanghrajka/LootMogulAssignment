import React from 'react'
import StudentElement from './StudentElement.jsx'

const StudentList = ({ studentList }) => {
    return (
        <>
            {studentList.length === 0 && <p className='data_not_found font color_dark'>No Students Found.</p>}
            {
                studentList.length !== 0 &&
                <div className='student_list_container'>

                    <div className='student_element_container font color_dark'>
                        <p className='student_element_id'>Id</p>
                        <p className='student_element_name'>Name</p>
                        <p className='student_element_batch'>Batch</p>
                    </div>

                    {
                        studentList.map((student, index) => {
                            return <StudentElement key={index} student={student} />
                        })
                    }
                </div>
            }

        </>
    )
}

export default StudentList