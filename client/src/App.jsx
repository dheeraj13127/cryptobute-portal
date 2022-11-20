
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Signin,Signup,PageNotFound, NewFundraiser,ViewFundraiser} from './globals';
import {Web3Modal} from '@web3modal/react'
import './App.scss';
import BlockchainProvider from './blockchain';
function App() {
  const config={
    projectId:process.env.REACT_APP_WEB3MODALID,
    theme:'dark',
    accentColor:'default',
    ethereum:{
      appName:'cryptobuteportal'
    },
    
  
  }

  return (
    <>
      <Web3Modal config={config} />
    <BlockchainProvider/>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='*' element={<PageNotFound/>}/> 
        <Route path='/newFundraiser' element={<NewFundraiser/>}/>
        <Route path="viewFundraiser/:id/:mid" element={<ViewFundraiser/>}/>
      </Routes> 
    </Router>
    </>
  ) 
}

export default App
