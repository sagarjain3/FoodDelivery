import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCity } from '../redux/userSlice'

function useGetCity() {
    //  location lene k lye navigator ka use krte h
    const dipatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const apikey = import.meta.env.VITE_GEOAPIKEY
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            // console.log(position)
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)

            // console.log(result.data.results[0].city)
            dipatch(setCity(result?.data?.results[0].city))

        })

    }, [])
}

export default useGetCity
