import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
function Login() {

    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [err, setErr] = useState("")

    const handleLogin = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email, password
            }, { withCredentials: true })
            console.log(result.data)
            setErr("")
        } catch (error) {
            setErr(error?.response?.data?.message)
        }
    }

    const handleGoogleAuth = async () => {

        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        // console.log(result)

        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {

                email: result.user.email,

            }, { withCredentials: true })
            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className='min-h-screen w-full flex items-center  justify-center p-4 overflow-y-auto' style={{ backgroundColor: bgColor }}>

            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 my-8`} style={{
                border: `1px solid ${borderColor}`
            }}>

                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Vingo</h1>

                <p className='text-gray-600 mb-8'>Login your account to get started with delicious food deliveries </p>



                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>


                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative '>
                        <input type={showPassword ? 'text' : 'password'} className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} required />

                        <button className='absolute right-3 top-3.5 cursor-pointer text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>

                    {/* forgot password */}

                    <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer' onClick={() => navigate("/forgot-password")}>
                        Forgot Password
                    </div>



                </div>


                <button className='w-full font-semibold py-2 rounded-lg transition duration-200 hover:bg-[#e64323] bg-[#ff4d2d] text-white ' onClick={handleLogin}>Login</button>

                {err && <p className='text-center text-red-500 my-2.5'>*{err}</p>}



                <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100' onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    <span>Login with Google</span>
                </button>
                <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/signup")}>Want to create a new have account? <span className='text-[#ff4d2d]'>Sign Up</span></p>

            </div>

        </div>
    )
}

export default Login
