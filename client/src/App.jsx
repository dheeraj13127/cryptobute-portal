
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,PageNotFound, NewFundraiser,ViewFundraiser, NotificationSection, MyFundraisers, MyFundraisersView, GetStarted} from './globals';
import './App.scss';
import BlockchainProvider from './blockchain';
function App() {

  return (
    <>
    <BlockchainProvider/>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Dashboard/>} /> */}
        <Route path='/getStarted' element={<GetStarted/>}/>
        <Route path='*' element={<PageNotFound/>}/> 
        <Route path="/dashboard/*" element={<Dashboard/>}/>
 
      </Routes> 
    </Router>
    </>
  ) 
}

export default App
