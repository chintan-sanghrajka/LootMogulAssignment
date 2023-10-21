import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getColleges } from '../store/college/collegeAction'
import { useSelector, useDispatch } from 'react-redux'
import CollegeList from './../common/college/CollegeList.jsx'
import { removeDuplicateEntries } from '../common/helper'

const Colleges = () => {
    const { action, value } = useParams()
    console.log(action, value)
    let limit = 2;
    const [pageNo, setPageNo] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getColleges({ action, value, limit, pageNo }))
    }, [pageNo])

    let collegeList = useSelector(state => state.college.collegeList)

    collegeList = removeDuplicateEntries(collegeList)

    return (
        <>
            <div className='college_container'>
                {action === "state" && <h3 className='color_dark font home_college_list_heading'>Colleges In {value}</h3>}
                {action === "course" && <h3 className='color_dark font home_college_list_heading'>Colleges offering {value}</h3>}
                <CollegeList collegeList={collegeList} />
                <p className='load_more color_dark font' onClick={() => setPageNo(pageNo + 1)}>Load More</p>

            </div>
        </>
    )
}

export default Colleges