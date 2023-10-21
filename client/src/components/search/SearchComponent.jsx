import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchColleges } from '../store/college/collegeAction'
import { useNavigate } from 'react-router-dom'

const SearchComponent = () => {
    const [userInput, setUserInput] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onChangeHandler = (event) => {
        setUserInput(event.target.value)
        console.log(userInput)
    }

    useEffect(() => {
        if (userInput !== "") {
            dispatch(getSearchColleges(userInput))
        }
    }, [userInput])

    const collegeList = useSelector(state => state.college.searchColleges)
    console.log(collegeList)

    const onClickHandler = (id) => {
        navigate(`/college-page/${id}`)
        setUserInput("")
    }

    return (
        <>
            <div className='search_outer_container'>
                <div className='search_container'>
                    <input type="text" placeholder='Enter College Id / College Name' className='search_input'
                        value={userInput}
                        onChange={onChangeHandler} />
                </div>
                {userInput !== "" &&
                    <div className='search_result_container'>
                        {collegeList.map((college, index) => {
                            return <p className='search_college_name color_dark font' key={index}
                                onClick={() => onClickHandler(college.id)}
                            >{college.id} - {college.name}</p>
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default SearchComponent