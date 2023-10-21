import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCollegeData } from '../store/college/collegeAction.js'
import { getStudentList } from '../store/student/studentAction.js'
import CollegeData from './CollegeData.jsx'
import StudentList from '../common/student/StudentList.jsx'
import SimilarColleges from '../common/college/SimilarColleges.jsx'

const CollegePage = () => {
    const { collegeId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const limit = 5;
    const pageNo = 1;

    useEffect(() => {
        dispatch(getCollegeData(collegeId))
        dispatch(getStudentList({ collegeId, limit, pageNo }))
    }, [collegeId])

    const [collegeData] = useSelector(state => state.college.collegeData)

    const studentList = useSelector(state => state.student.studentList)

    return (
        <>
            <CollegeData collegeData={collegeData} />
            <h3 className='color_dark font college_page_section_head'>Students of {collegeData !== undefined && collegeData.name}</h3>
            <StudentList studentList={studentList} />
            {studentList.length !== 0 && <span className='view_all font color_dark' onClick={() => navigate(`/students-by-college/${collegeData.id}/${collegeData.name}`)}>View All Students</span>}
            {
                collegeData !== undefined &&
                collegeData.courses.map((course, index) => {
                    return <div key={index}>
                        <h3 className='color_dark font college_page_section_head'>Other College offering {course} in {collegeData.state}</h3>
                        <SimilarColleges props={{ state: collegeData.state, noOfStudents: collegeData.noOfStudents, course: course, id: collegeData.id }} />
                    </div>
                })
            }
        </>
    )
}

export default CollegePage