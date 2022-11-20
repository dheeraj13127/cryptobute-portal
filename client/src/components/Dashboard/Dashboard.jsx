import React, { useEffect } from 'react'
import {DashboardNavbar,FundraisersPool,HealthBulletin} from '.'

import {useDispatch} from 'react-redux'
import { getFundraisers } from '../../redux/actions/blockchain'
function Dashboard() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getFundraisers())
},[])// eslint-disable-line react-hooks/exhaustive-deps 

  return (
    <div>
      <DashboardNavbar/>
      <HealthBulletin/>
      <FundraisersPool/>
    </div>
  )
}

export default Dashboard