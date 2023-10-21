import React, { useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { getStateWiseData } from '../store/home/homeAction';
import { useNavigate } from 'react-router-dom'

const StateWisePie = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getStateWiseData())
  }, [])

  const stateWiseData = useSelector(state => state.home.stateWiseData)

  const myLabel = (index) => {
    return index.label
  }

  return (
    <div >
      <PieChart width={640} height={400}>
        <Pie
          data={stateWiseData}
          cx={320}
          cy={200}
          innerRadius={55}
          outerRadius={90}
          paddingAngle={4}
          dataKey="count"
          label={myLabel}
        >
          {stateWiseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={"#0088fe"} onClick={() => navigate(`/colleges/state/${entry.state}`)} label={entry.state} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default StateWisePie