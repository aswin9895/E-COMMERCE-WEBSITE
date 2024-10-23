import React, { useEffect, useState } from 'react'
import Header from '../COMPONENTS/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../REDUX/SLICES/wishlistSlice'
import { addToCart } from '../REDUX/SLICES/cartSlice'

const View = () => {

  const { id } = useParams()
  // console.log(id);
  const [product, setProduct] = useState({})
  const userCart = useSelector(state => state.cartReducer)
  const userWishlist = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts?.find(item => item.id == id))
    }
  }, [])
  // console.log(product);

  // add to wishlist
  const handleWishlist = (product) => {
    const existingProduct = userWishlist?.find(item => item.id == product.id)
    if (existingProduct) {
      alert("Product Already In your Wishlist!!!")
    } else {
      dispatch(addToWishlist(product))
    }
  }

  // add to cart
  const handleCart = (product) => {
    dispatch(addToCart(product))
    const existingProduct = userCart?.find(item => item.id == product.id)
    if (existingProduct) {
      alert("Product Quantity Is Incrementing!!!")
    }
  }

  return (
    <>
      <Header />
      <div>
        <div style={{ paddingTop: "90px" }} className="flex content-center items-center mx-5">
          <div className="grid grid-cols-2 items-center">
            <img width={'650px'} height={'50%'} src={product?.thumbnail} alt="" />
            <div>
              <h3>PID: {product?.id}</h3>
              <h1 className="text-5xl font-bold">{product?.title}</h1>
              <h4 className="font-bold text-red-600 text-2xl"> $ {product?.price}</h4>
              <h4 className="font-bold">Brand : <span className='font-normal'>{product?.brand}</span></h4>
              <h4 className="font-bold">Category : <span className='font-normal'>{product?.category}</span></h4>
              <p className='text-justify'>
                <span className="font-bold">Description</span> : {product?.description}
              </p>
              <h3 className='font-bold my-3'>Client review</h3>
              {
                product?.reviews?.length > 0 &&
                product?.reviews?.map((item,index) => (
                  <div key={index} className="border rounded p-2 my-2">
                    <h5>
                      <span className="font-bold">{item?.reviewerName} : </span> {item?.comment}
                    </h5>
                    <p>Rating : {item?.rating}</p>
                  </div>
                ))
              }
              <div className="flex justify-between mt-5">
                <button onClick={() => handleWishlist(product)} className="text-white bg-blue-500 rounded p-2">ADD TO WISHLIST</button>
                <button onClick={() => handleCart(product)} className="text-white bg-green-500 rounded p-2 me-2">ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View