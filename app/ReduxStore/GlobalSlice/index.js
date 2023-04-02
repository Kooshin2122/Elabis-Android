// imports
import { createSlice } from '@reduxjs/toolkit'
// Initial States
const initialState = {
    shouldRenderTabBar: true
}
// Main Slice
export const globalSlice = createSlice({
    initialState,
    name: 'globalSlice',
    reducers: {
        // I use this to show or hide tabBar Buttons in some screens
        hideTabBar: (state, action) => {
            state.shouldRenderTabBar = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { hideTabBar } = globalSlice.actions

export default globalSlice.reducer;