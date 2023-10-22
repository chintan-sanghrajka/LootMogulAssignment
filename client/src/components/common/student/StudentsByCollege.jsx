import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { clearStudents, getStudentListByCollege } from '../../store/student/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import StudentList from './StudentList'
import { removeDuplicateEntries } from '../helper'

const StudentsByCollege = () => {
    const { collegeId, collegeName } = useParams()
    const dispatch = useDispatch()
    let limit = 10;
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        dispatch(clearStudents())
    }, [])

    useEffect(() => {
        dispatch(getStudentListByCollege({ collegeId, limit, pageNo }))
    }, [pageNo])

    let studentList = useSelector(state => state.student.studentListByCollege)

    let studentCount = useSelector(state => state.student.studentCount)

    studentList = removeDuplicateEntries(studentList)

    return (
        <>
            <div className='student_by_college_container'>
                <h3 className='color_dark font student_by_college_head'>Students from {collegeName}</h3>
                <StudentList studentList={studentList} />
                {
                    studentList.length === 0 ?

                        <p></p> :
                        studentCount === studentList.length ?
                            <p className='load_more color_dark font'>No More Records</p> :
                            <p className='load_more color_dark font' onClick={() => setPageNo(pageNo + 1)}>Load More</p>
                }
            </div>
        </>
    )
}

export default StudentsByCollege