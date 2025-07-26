import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import withAuthProtection from './controllers/withAuthProtection';

const DashBoard = lazy(() => import('./views/DashBoard'));
const Login = lazy(() => import('./views/Login'));
const Signup = lazy(() => import('./views/Signup'))
const User = lazy(() => import('./views/User'))
const OtpVerify = lazy(() => import('./views/OtpVerify'))

const App = () => {
  const ProtectedDashboard = withAuthProtection(DashBoard);
  const ProtectedLogin = withAuthProtection(Login);
  const ProtectedSignup = withAuthProtection(Signup);
  const ProtectedUser = withAuthProtection(User);
  const ProtectedOtp = withAuthProtection(OtpVerify)
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='h-[100vh] w-[100vw] flex items-center justify-center bg-blue-100'>Loading...</div>}>
        <Routes>
          <Route path='/login' element={<ProtectedLogin />} />
          <Route path='/' element={<ProtectedSignup />} />
          <Route path='/dashboard' element={<ProtectedDashboard />} />
          <Route path='/user/:id' element={<ProtectedUser />} />
          <Route path='/otp-verify' element={<ProtectedOtp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
