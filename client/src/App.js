import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OtpVerify from './views/OtpVerify';

const DashBoard = lazy(() => import('./views/DashBoard'));
const Login = lazy(() => import('./views/Login'));
const Signup=lazy(()=> import('./views/Signup'))
const User=lazy(()=>import('./views/User'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='h-[100vh] w-[100vw] flex items-center justify-center bg-blue-100'>Loading...</div>}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Signup/>}/>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/user/:id' element={<User/>}/>
          <Route path='/otp-verify' element={<OtpVerify/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
