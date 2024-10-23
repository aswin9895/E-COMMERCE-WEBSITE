import React, { useEffect, useState } from 'react'
import Header from '../COMPONENTS/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cartGif from '../assets/a7e6c2e9333d0989e3a54c95dd8321-unscreen.gif'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../REDUX/SLICES/cartSlice'



const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usercart = useSelector(state => state.cartReducer)
  const [cartTotal, setCartTotal] = useState(0)


  useEffect(() => {
    if (usercart?.length > 0) {
      setCartTotal(usercart?.map(item => item.totalPrice)?.reduce((a, b) => a + b)
      )
    }
  }, [usercart])

  const handleDecrementQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(decQuantity(product))
    } else {
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCheckout = () => {
    dispatch(emptyCart())
    alert("Order Confirmed... ThankYou For Shopping With Us!!!")
    navigate('/')
  }
  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }} className="container px-9 mx-auto">
        {
          usercart?.length > 0 ?
            <>
              <h1 className="text-5xl text-blue-600 font-bold">Cart Summary</h1>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="col-span-2 border rounded shadow-xl p-5">
                  {/* table */}
                  <table className='table-auto w-full'>
                    <thead>
                      <tr>
                        <td className="font-semibold">#</td>
                        <td className="font-semibold">Name</td>
                        <td className="font-semibold">Image</td>
                        <td className="font-semibold">Quantity</td>
                        <td className="font-semibold">Price</td>
                        <td className="font-semibold">...</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        usercart?.map((product, index) => (
                          <tr key={product?.id}>
                            <td>{index + 1}</td>
                            <td>{product?.title}</td>
                            <td><img width={"80px"} height={'80px'} src={product?.thumbnail} alt="" /></td>
                            <td>
                              <div className="flex">
                                <button onClick={() => handleDecrementQuantity(product)} style={{ width: "30px" }} className='btn font-bold rounded shadow p-2'>-</button>
                                <input readOnly value={product?.quantity} style={{ width: "50px", textAlign: "center", fontWeight: "bold" }} type="text" />
                                <button onClick={() => dispatch(incQuantity(product))} style={{ width: "30px" }} className='btn font-bold rounded shadow p-2'>+</button>
                              </div>
                            </td>
                            <td>${product?.totalPrice}</td>
                            <td><button onClick={() => dispatch(removeCartItem(product?.id))} className="text-red-600"><i className="fa-solid fa-trash"></i></button></td>
                          </tr>
                        ))

                      }
                    </tbody>
                  </table>
                  <div className="float-right mt-4">
                    <button onClick={() => dispatch(emptyCart())} className="bg-red-600 text-white p-2 rounded me-3">EMPTY CART</button>
                    <Link to={'/'} className="bg-blue-600 text-white p-2 rounded">SHOP MORE</Link>
                  </div>
                </div>
                <div className="col-span-1 border rounded shadow-xl p-5">
                  {/* checkout */}
                  <h1 className="text-2xl font-bold">Total Amount : <span className="text-red-600"> ${cartTotal} </span></h1>
                  <hr />
                  <button onClick={handleCheckout} className="w-full bg-green-600 p-5 rounded text-white font-bold mt-5 text-xl">Checkout</button>
                </div>
              </div>
            </>
            :
            <div className='flex flex-col justify-center items-center'>
              <img style={{ height: "300px" }} src={cartGif} alt="" />
              <h1 className='text-yellow-600 font-bold text-3xl mx-5'>Your Cart is Empty!!!</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Cart