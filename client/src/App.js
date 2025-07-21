import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './views/DashBoard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App