import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getStudentData } from '../../store/student/studentAction.js'
import { useDispatch, useSelector } from 'react-redux'
import StudentData from './StudentData.jsx'
import { getStudentList } from '../../store/student/studentAction.js'
import StudentList from './StudentList.jsx'

const StudentPage = () => {
    const { studentId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getStudentData(studentId))
    }, [studentId])

    const [studentData] = useSelector(state => state.student.studentData)

    let limit = 10;
    let pageNo = 1;

    useEffect(() => {
        if (studentData !== undefined) {
            let collegeId = studentData.collegeId
            dispatch(getStudentList({ collegeId, limit, pageNo }))
        }
    }, [studentData])

    let otherStudents = useSelector(state => state.student.studentList)

    if (otherStudents.length !== 0) {
        otherStudents = otherStudents.filter((student) => {
            return student._id !== studentId
        })
    }

    return (
        <>
            <StudentData studentData={studentData} />
            {studentData !== undefined && <p className='student_page_section_head color_dark font'>Other Students of {studentData.collegeName}</p>}
            {otherStudents.length !== 0 &&
                <StudentList studentList={otherStudents} />
            }
            {otherStudents.length !== 0 && <span className='view_all font color_dark' onClick={() => navigate(`/students-by-college/${studentData.collegeId}/${studentData.collegeName}`)}>View All Students</span>}
        </>
    )
}

export default StudentPage