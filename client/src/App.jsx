import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  PageNotFound,
  Landing,
  Faqs,
  WhoAreWe,
  GetStarted
} from "./globals";
import "./App.scss";
import BlockchainProvider from "./blockchain";

function App() {
  return (
    <>
      <BlockchainProvider />

 
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path='/getStarted' element={<GetStarted />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/faq" element={<Faqs />} />
          <Route path="/who-are-we" element={<WhoAreWe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
