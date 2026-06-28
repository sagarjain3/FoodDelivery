import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myShopData: null,

    },
    reducers: {
        setMyShopData: (state, action) => {
            state.myShopData = action.payload // isme jo current shop h owner ki uska data h 
        },

    }
})

export const { setMyShopData } = ownerSlice.actions
export default ownerSlice.reducer