import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudentListByCollege } from '../../store/student/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import StudentList from './StudentList'
import { removeDuplicateEntries } from '../helper'

const StudentsByCollege = () => {
    const { collegeId, collegeName } = useParams()
    const dispatch = useDispatch()
    let limit = 2;
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        dispatch(getStudentListByCollege({ collegeId, limit, pageNo }))
    }, [pageNo])

    let studentList = useSelector(state => state.student.studentListByCollege)



    studentList = removeDuplicateEntries(studentList)

    return (
        <>
            <div className='student_by_college_container'>
                <h3 className='color_dark font student_by_college_head'>Students from {collegeName}</h3>
                <StudentList studentList={studentList} />
                <p className='load_more color_dark font' onClick={() => setPageNo(pageNo + 1)}>Load More</p>
            </div>
        </>
    )
}

export default StudentsByCollege