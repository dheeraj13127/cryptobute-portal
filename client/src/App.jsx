
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Signin,Signup,PageNotFound, NewFundraiser,ViewFundraiser, NotificationSection, MyFundraisers, MyFundraisersView,Landing} from './globals';
import './App.scss';
import BlockchainProvider from './blockchain';
function App() {

  return (
    <>
    
    <BlockchainProvider/>
    <Router>
      <Routes>
        <Route path='/*' element={<Dashboard/>} />
        <Route path='/landing' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='*' element={<PageNotFound/>}/> 
        <Route path='/newFundraiser' element={<NewFundraiser/>}/>
        <Route path="viewFundraiser/:id/:mid" element={<ViewFundraiser/>}/>
        <Route path='/notifications' element={<NotificationSection/>}/>
        <Route path='/myFundraisers' element={<MyFundraisers/>}/>
        <Route path='/myFundraisers/:id/:mid' element={<MyFundraisersView/>}/>
      </Routes> 
    </Router>
    </>
  ) 
}

export default App
