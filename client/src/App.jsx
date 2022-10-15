
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Signin,Signup,PageNotFound} from './globals';
import './App.scss';
import BlockchainProvider from './blockchain';
function App() {
  return (
    <>
    <BlockchainProvider/>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='*' element={<PageNotFound/>}/> 
      </Routes> 
    </Router>
    </>
  ) 
}

export default App
