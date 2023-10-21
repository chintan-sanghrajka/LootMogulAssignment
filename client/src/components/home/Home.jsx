import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollegesByRating } from '../store/home/homeAction.js';
import CollegeList from '../common/college/CollegeList.jsx';
import StateWisePie from './StateWisePie.jsx';
import CourseWisePie from './CourseWisePie.jsx'

const Home = () => {
    const dispatch = useDispatch();
    const collegeRecord = 10;

    useEffect(() => {
        dispatch(getCollegesByRating(10))
    }, [dispatch])

    const collegeListByRating = useSelector(state => state.home.collegeListByRating)

    return (
        <>
            <div>
                <h2 className='home_welcome font color_dark'>Welcome User,</h2>
                <div className='home_pie_container'>
                    <StateWisePie />
                    <CourseWisePie />
                </div>
                <h4 className='home_college_list_heading font color_dark'>{`Top ${collegeRecord} Engineering Colleges in India`}</h4>
                <CollegeList collegeList={collegeListByRating} />
            </div>
        </>
    )
}

export default Home;