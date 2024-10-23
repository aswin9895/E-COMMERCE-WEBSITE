import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        addToWishlist:(state,dataFromview)=>{
            state.push(dataFromview.payload)
        },
        removeWishlistitem:(state,dataFromWishlist)=>{
          return  state.filter(item=>item.id!=dataFromWishlist.payload)
        }
    }
})

export const {addToWishlist, removeWishlistitem}=wishlistSlice.actions
export default wishlistSlice.reducer