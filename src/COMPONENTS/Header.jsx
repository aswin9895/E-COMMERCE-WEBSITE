import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../REDUX/SLICES/productSlice'

const Header = ({ insideHome }) => {


  const userCart=useSelector(state=>state.cartReducer)
  const userWishlist=useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()

  return (
    <nav className='flex bg-yellow-600 fixed w-full p-5'>
      <Link className='text-white font-bold' to={'/'}> <i className='fa-solid fa-truck-fast me-1'></i> E Cart</Link>
      <ul className='flex-1 text-right'>
        {insideHome && <li className='list-none inline-block px-5'><input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} className='rounded p-1' style={{ width: "300px" }} type="text" placeholder='Search Products Here' /></li>}
        <li className='list-none inline-block px-5'><Link to={'/wishlist'} className='text-white font-bold'> <i className='fa-solid fa-heart text-red-600 pe-1'></i>Wishlist <span className='rounded bg-black p-1'>{userWishlist?.length}</span></Link></li>
        <li className='list-none inline-block px-5'><Link to={'/cart'} className='text-white font-bold'> <i className='fa-solid fa-cart-plus text-green-600 pe-1'></i>Cart <span className='rounded bg-black p-1'>{userCart?.length}</span></Link></li>
      </ul>
    </nav>
  )
}

export default Header