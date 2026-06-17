import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';

function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSendOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
            console.log(result.data)
            setLoading(false)
            setStep(2)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleVerifyOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
            console.log(result.data)
            setLoading(false)
            setStep(3)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleResetPassword = async () => {
        setLoading(true)
        if (newPassword != cnfPassword) {
            return null
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
            console.log(result.data)
            setLoading(false)
            navigate("/login")

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]'>

            <div className='bg-white max-w-md shadow-lg p-8 rounded-xl w-full'>

                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={30} className='text-black cursor-pointer' onClick={() => navigate("/login")} />
                    <h1 className='text-2xl font-bold text-center text-orange-300'>Forgot Password</h1>
                </div>

                {step == 1 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none border-gray-200' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <button className='w-full font-semibold py-2 rounded-lg transition duration-200 hover:bg-[#e64323] bg-[#ff4d2d] text-white ' onClick={handleSendOtp}>{loading ? "Loading..." : "Sent OTP"}</button>

                    </div>}


                {step == 2 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input type="otp" className='w-full border rounded-lg px-3 py-2 focus:outline-none border-gray-200' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} value={otp} />
                        </div>

                        <button className='w-full font-semibold py-2 rounded-lg transition duration-200 hover:bg-[#e64323] bg-[#ff4d2d] text-white ' onClick={handleVerifyOtp}>{loading ? "Loading..." : "Verify"}</button>

                    </div>}


                {step == 3 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="newpassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input type="password" className='w-full border rounded-lg px-3 py-2 focus:outline-none border-gray-200' placeholder='Enter New Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor="cnfpassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input type="password" className='w-full border rounded-lg px-3 py-2 focus:outline-none border-gray-200' placeholder='Enter Confirm Password' onChange={(e) => setCnfPassword(e.target.value)} value={cnfPassword} />
                        </div>

                        <button className='w-full font-semibold py-2 rounded-lg transition duration-200 hover:bg-[#e64323] bg-[#ff4d2d] text-white ' onClick={handleResetPassword}>{loading ? "Loading..." : "Reset Password"}</button>

                    </div>}

            </div>

        </div>
    )
}

export default ForgotPassword
