import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../helper.js'
import axios from 'axios'
import CollegeList from './CollegeList.jsx'

const SimilarColleges = ({ props }) => {

    const [collegeList, setCollegeList] = useState([]);

    useEffect(() => {
        axios.post(`${BASE_URL}get-similar-colleges`, {
            state: props.state,
            course: props.course,
            noOfStudents: props.noOfStudents,
            currentId: props.id,
        }).then((res) => {
            setCollegeList(res.data.similarCollegeList)
        }).catch((error) => console.log(error))
    }, [props])

    return (
        <>
            <CollegeList collegeList={collegeList} />
            {/* <span className='view_all color_dark font'>View All Colleges</span> */}
        </>
    )
}

export default SimilarColleges