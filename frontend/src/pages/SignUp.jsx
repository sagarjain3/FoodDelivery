import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners'
function SignUp() {

    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
            }, { withCredentials: true })
            console.log(result.data)
            setLoading(false)
            setErr("")

        } catch (error) {
            // console.log(error)
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    }
    const handleGoogleAuth = async () => {
        if (!mobile) {
            return setErr("mobile no is required")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        // console.log(result)

        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
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

                <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries </p>


                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Full Name' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                </div>

                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>


                <div className='mb-4'>
                    <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
                    <input type="tel" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Mobile Number' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setMobile(e.target.value)} value={mobile} required />
                </div>


                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative '>
                        <input type={showPassword ? 'text' : 'password'} className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} required />

                        <button className='absolute right-3 top-3.5 cursor-pointer text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>




                </div>

                {/* role */}
                <div className='mb-4'>
                    <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
                    <div className='flex gap-2'>

                        {["user", "owner", "deliveryBoy"].map((r) => (

                            <button className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer' onClick={() => setRole(r)} style={

                                role === r ? { background: primaryColor, color: 'white' } : { border: `1px solid ${primaryColor}`, color: '#333' }
                            }>{r}</button>
                        ))}
                    </div>




                </div>
                <button className='w-full font-semibold py-2 rounded-lg transition duration-200 hover:bg-[#e64323] bg-[#ff4d2d] text-white ' onClick={handleSignUp} disabled={loading}>{loading ? <ClipLoader size={20} /> : "Sign Up"}</button>

                {err && <p className='text-center text-red-500 my-2.5'>*{err}</p>}



                <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100' onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>
                <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/login")}>Already have an account? <span className='text-[#ff4d2d]'>Sign In</span></p>

            </div>

        </div>
    )
}

export default SignUp
