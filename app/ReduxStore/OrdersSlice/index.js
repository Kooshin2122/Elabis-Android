// imports
import { createSlice } from '@reduxjs/toolkit';
// Initial States;
const initialState = {
    personalInfo: {
        fullName: null,
        phoneNumber: null,
        email: null
    },
    deliveryAddress: {
        country: null,
        city: null,
        village: null,
        addressDescription: null
    },
    paymentInfo: {
        serviceName: '',
        phoneNumber: '',
        imageUrl: null
    }
}
// Main Slice;
export const ordersScreenSlice = createSlice({
    initialState,
    name: 'ordersSlice',
    reducers: {
        changePersonalInfo: (state, action) => {
            state.personalInfo = action.payload
        },
        changeDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload
        },
        changePaymentInfo: (state, action) => {
            state.paymentInfo = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changePersonalInfo, changeDeliveryAddress, changePaymentInfo } = ordersScreenSlice.actions

export default ordersScreenSlice.reducer;