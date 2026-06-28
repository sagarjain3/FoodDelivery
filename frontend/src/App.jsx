import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import useGetCurrnetUser from './hooks/useGetCurrnetUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import useGetCity from './hooks/useGetCity.jsx'
import useGetMyShop from './hooks/useGetMyShop.jsx'
import CreateEditShop from './pages/CreateEditShop.jsx'
export const serverUrl = "http://localhost:8000"

function App() {
  const { userData } = useSelector(state => state.user)
  useGetCurrnetUser()
  useGetCity()
  useGetMyShop()
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to={"/login"} />} />
    </Routes>
  )
}

export default App


