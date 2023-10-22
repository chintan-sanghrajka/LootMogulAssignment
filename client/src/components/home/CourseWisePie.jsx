import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseWiseData } from '../store/home/homeAction'
import { PieChart, Pie, Cell } from 'recharts'
import { useNavigate } from 'react-router-dom'

const CourseWisePie = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getCourseWiseData())
    }, [])

    const courseWiseData = useSelector(state => state.home.courseWiseData)

    const myLabel = (index) => {
        return index.course
    }

    return (
        <div className='pie_position'>
            <h2 className='pie_head color_dark font'>Colleges by Course</h2>
            <div className='overflow_allow'>
                <PieChart width={400} height={340} className='pie'>
                    <Pie
                        data={courseWiseData}
                        cx={200}
                        cy={170}
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="collegeCount"
                        label={myLabel}
                    >
                        {courseWiseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={"#ff8042"} onClick={() => navigate(`/colleges/course/${entry.course}`)} label={entry.course} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    )
}

export default CourseWisePie