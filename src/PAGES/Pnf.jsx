import React from 'react'
import Header from '../COMPONENTS/Header'
import { Link } from 'react-router-dom'


const Pnf = () => {
  return (
    <>
      <Header />
      <div style={{paddingTop:"100px"}} className="flex justify-center items-center flex-col">
<h1 className="font-bold text-8xl mb-2">ERROR 404</h1>
<img width={'300px'} height={'200px'} src='https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif' alt="" />
<h1 className="font-bold text-4xl mb-2">Looks like You'r Lost.</h1>
<p className="mb-2">The Page You Are Looking For Is Not Available.</p>
<Link to={'/'} className='bg-green-600 p-2 text-white rounded'>Home</Link>
      </div>
    </>
  )
}

export default Pnf