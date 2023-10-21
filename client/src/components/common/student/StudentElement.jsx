import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentElement = ({ student }) => {
    const navigate = useNavigate();
    return (
        <div className='student_element_container font color_dark'
            onClick={() => navigate(`/student-page/${student._id}`)}
        >
            <p className='student_element_id'>{student.id}</p>
            <p className='student_element_name'>{student.name}</p>
            <p className='student_element_batch'>{student.batch}</p>
        </div>
    )
}

export default StudentElement