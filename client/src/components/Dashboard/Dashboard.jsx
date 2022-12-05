import React, { useEffect, useState } from 'react'
import {DashboardNavbar,FundraisersPool,HealthBulletin} from '.'
import {useDispatch} from 'react-redux'
import { getFundraisers } from '../../redux/actions/blockchain'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { MyFundraisers, MyFundraisersView, NewFundraiser, NotificationSection, ViewFundraiser } from '../../globals'

function Dashboard() {
  const navigate=useNavigate()
  const location=useLocation()
  useEffect(()=>{
    let userId=sessionStorage.getItem("userId")
    if(userId===undefined||userId===null){
      navigate("/getStarted")
    }
  },[])
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getFundraisers())
},[])// eslint-disable-line react-hooks/exhaustive-deps 

  return (
    <div>
      <Routes>
      <Route path='/newFundraiser' element={<NewFundraiser/>}/>
        <Route path="viewFundraiser/:id/:mid" element={<ViewFundraiser/>}/>
        <Route path='/notifications' element={<NotificationSection/>}/>
        <Route path='/myFundraisers' element={<MyFundraisers/>}/>
        <Route path='/myFundraisers/:id/:mid' element={<MyFundraisersView/>}/>
      </Routes>
      {location.pathname==='/dashboard'&&(
        <>
          <DashboardNavbar/>
      <HealthBulletin/>
      <FundraisersPool/>
        </>
      )}
    
    </div>
  )
}

export default Dashboard