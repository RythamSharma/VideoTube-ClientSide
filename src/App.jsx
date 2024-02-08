import './App.css'
import React from 'react'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { RecoilRoot } from "recoil";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import Editprofile from './Pages/Editprofile';
function App() {
  const [progress, setProgress] = useState(0)
  return (
    <RecoilRoot>
    <>      
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Router>
        <Routes>
        <Route exact path="/" element={<React.Fragment><Dashboard setProgress={setProgress}/></React.Fragment>} />
        <Route exact path="/login" element={<React.Fragment><Login setProgress={setProgress}/></React.Fragment>} />
        <Route exact path="/signup" element={<React.Fragment><Signup setProgress={setProgress}/></React.Fragment>} />
        <Route exact path="/edit-profile" element={<React.Fragment><Editprofile setProgress={setProgress}/></React.Fragment>} />
        </Routes>
      </Router>
    </>
    </RecoilRoot>
  )
}

export default App
