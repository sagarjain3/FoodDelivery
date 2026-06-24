import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
function Nav() {
    const { userData, city } = useSelector(state => state.user)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-20 flex items-center justify-between md:justify-center gap-5 px-5 fixed top-0 left-0 z-50 bg-[#fff9f6]'>

            {/* 
chote diveces k lye */}

            {showSearch && <div className='w-[90%]  h-15 bg-white shadow-xl rounded-lg flex fixed top-[80px] left-[5%] items-center md:hidden'>

                {/* Location */}
                <div className='flex items-center w-[25%] gap-2 px-2 border-r border-gray-300'>
                    <FaLocationDot size={20} className='text-[#ff4d2d]' />

                    <div className='truncate text-gray-600'>
                        {city}
                    </div>
                </div>

                {/* Search */}
                <div className='flex items-center flex-1 gap-3 px-4'>

                    <FaSearch size={18} className='text-[#ff4d2d]' />

                    <input
                        type="text"
                        placeholder='Search delicious food...'
                        className='w-full outline-none text-gray-700'
                    />
                </div>

            </div>}



            {/* Logo */}
            <h1 className='text-3xl font-bold text-[#ff4d2d]'>
                Vingo
            </h1>

            {/* Search Box */}
            <div className='w-[70%] lg:w-[50%] h-15 bg-white shadow-xl rounded-lg hidden md:flex items-center px-4'>

                {/* Location */}
                <div className='flex items-center w-[25%] gap-2 px-2 border-r border-gray-300'>
                    <FaLocationDot size={20} className='text-[#ff4d2d]' />

                    <div className='truncate text-gray-600'>
                        {city}
                    </div>
                </div>

                {/* Search */}
                <div className='flex items-center flex-1 gap-3 px-4'>
                    <FaSearch size={18} className='text-[#ff4d2d]' />

                    <input
                        type="text"
                        placeholder='Search delicious food...'
                        className='w-full outline-none text-gray-700'
                    />
                </div>

            </div>
            <div className='flex items-center gap-4'>
                {showSearch ? <RxCross2 size={18} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(false)} /> : <FaSearch size={18} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)} />}



                {/* card */}
                <div className='relative cursor-pointer'>
                    <LuShoppingBasket size={25} className='text-[#ff4d2d]' />
                    <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d] '>0</span>
                </div>

                <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm  font-medium cursor-pointer'>
                    My Orders
                </button>

                <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={() => setShowInfo(prev => !prev)}>
                    {userData?.fullName.slice(0, 1)}
                </div>

                {/* pop up */}
                {showInfo && <div className='fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-lg p-[20px] flex flex-col gap-[10px] z-[9999] rounded-2xl'>

                    <div className='text-[17px] font-semibold'>
                        {userData?.fullName}
                    </div>

                    <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>
                        My Orders
                    </div>

                    <div className='text-[#ff4d2d] font-semibold cursor-pointer' onClick={handleLogout}>
                        Log Out
                    </div>

                </div>}
            </div>
        </div>
    )
}

export default Nav