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
        console.log(index)
        return index.course
    }

    return (
        <div >
            <PieChart width={640} height={400}>
                <Pie
                    data={courseWiseData}
                    cx={320}
                    cy={200}
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
    )
}

export default CourseWisePie