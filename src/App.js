import React from 'react'
import EmailForm from './componets/email'
import DataDisplay from './componets/showData'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
   
    <Router>
      
        <Routes>
            <Route path='/' element={<EmailForm/>} /> 
            <Route path='/Data' element={<DataDisplay/>} /> 
             <Route />   

        </Routes>
    </Router>
    

  )
}

export default App