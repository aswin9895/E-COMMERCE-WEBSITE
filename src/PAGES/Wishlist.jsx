import React, { useEffect } from 'react'
import Header from '../COMPONENTS/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistitem } from '../REDUX/SLICES/wishlistSlice'
import { addToCart } from '../REDUX/SLICES/cartSlice'



const Wishlist = () => {
  const userCart=useSelector(state=>state.cartReducer)
  const userWishlist = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()

 // add to cart
 const handleCart = (product) => {
  dispatch(addToCart(product))
  const existingProduct = userCart?.find(item => item.id == product.id)
  dispatch(removeWishlistitem(product?.id))
  if (existingProduct) {
    alert("Product Quantity Is Incrementing!!!")
  } 
}

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }} className='container px-4 mx-auto'>
        {
          userWishlist?.length > 0 ?
            <>
              <h1 className="text-5xl font-bold text-red-500">My Wishlist</h1>
              <div className="grid grid-cols-4 gap-4 mt-5">
                {
                  userWishlist?.map(product => (
                    <div className="rounded border p-2 shadow">
                      <img width={"100%"} height={'200px'} src={product?.thumbnail} alt="" />
                      <div className="text-center">
                        <h3 className='text-xl font-bold'>{product?.title}</h3>
                        <div className="flex justify-evenly mt-4">
                          <button onClick={() => dispatch(removeWishlistitem(product?.id))} className="text-xl"> <i className="fa-solid fa-heart-circle-xmark text-red-600"></i></button>
                          <button onClick={()=>handleCart(product)} className="text-xl"> <i className="fa-solid fa-cart-plus text-green-600"></i></button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
            :
            <div className='flex flex-col justify-center items-center'>
              <img style={{ height: "300px" }} src="https://cdn.dribbble.com/users/1514097/screenshots/3550111/wishlist-icon.gif" alt="" />
              <h1 className='text-yellow-600 font-bold text-3xl mx-5'>Your Wishlist is Empty!!!</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Wishlist