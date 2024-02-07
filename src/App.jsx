import './App.css'
import React from 'react'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<React.Fragment><Dashboard/></React.Fragment>} />
        <Route exact path="/login" element={<React.Fragment><Login/></React.Fragment>} />
        <Route exact path="/signup" element={<React.Fragment><Signup/></React.Fragment>} />
        </Routes>
      </Router>
    </>
    </RecoilRoot>
  )
}

export default App
