import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './PAGES/Home'
import Wishlist from './PAGES/Wishlist'
import Cart from './PAGES/Cart'
import View from './PAGES/View'
import Pnf from './PAGES/Pnf'
import Footer from './COMPONENTS/Footer'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/:id/view' element={<View />} />
        <Route path='/*' element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
