//
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './OrdersSlice';
import productsReducer from './ProductScreenSlice';

export const store = configureStore({
    reducer: {
        productsSlice: productsReducer,
        ordersSlice: ordersReducer
    },
})