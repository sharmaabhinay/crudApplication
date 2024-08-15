import React from "react";
import {Routes,Route} from "react-router-dom"
import Navbar from "./header/Navbar";
import About from "./header/pages/About";
import Admin from "./header/pages/Admin";
import Single from "./header/pages/Single";



function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<About/>}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/user/:id' element={<Single />}/>

      </Routes>
    </>
  )
}

export default App
