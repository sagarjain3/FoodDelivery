import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'

import { setMyShopData } from '../redux/ownerSlice.js'

function useGetMyShop() {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true })
                // console.log(result)
                dispatch(setMyShopData(result.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchShop()

    }, [])
}

export default useGetMyShop
