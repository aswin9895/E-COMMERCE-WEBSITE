import { configureStore } from "@reduxjs/toolkit"
import productSlice from './SLICES/productSlice'
import wishlistSlice from './SLICES/wishlistSlice'
import cartSlice from './SLICES/cartSlice'

const cartStore = configureStore({
    reducer: {
        productReducer: productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:cartSlice

    }
})

export default cartStore