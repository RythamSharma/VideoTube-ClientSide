import './App.css'
import React from 'react'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<React.Fragment><Dashboard/></React.Fragment>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
