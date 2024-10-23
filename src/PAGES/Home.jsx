import React, { useEffect, useState } from 'react'
import Header from '../COMPONENTS/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../REDUX/SLICES/productSlice'

const Home = () => {

  const dispatch = useDispatch()
  const { allProducts, loading, error } = useSelector(state => state.productReducer)
  // console.log(allProducts, loading, error);
  const [CurrentPage,setCurrentPage]=useState(1)
  const productperPage=8
  const totalPage=Math.ceil(allProducts?.length/productperPage)
  const currentPageLastProductIndex=CurrentPage*productperPage
  const currentPageFirstProductIndex=currentPageLastProductIndex - productperPage
  const visibleProductCards = allProducts?.slice(currentPageFirstProductIndex,currentPageLastProductIndex) 


  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  const navigateToNextpage=()=>{
    if (CurrentPage!=totalPage) {
      setCurrentPage(CurrentPage+1)
    }
  }

  const navigateToPrevpage=()=>{
    if (CurrentPage!=1) {
      setCurrentPage(CurrentPage-1)
    }
  }

  return (
    <>
      <Header insideHome={true} />
      <div style={{ paddingTop: "100px" }} className='container px-4 mx-auto'>
        {
          loading ?
            <div className="flex justify-center items-center my-5 text-lg">
              <img width={'70px'} height={'70px'} src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg" alt="loading" className="me-2" /> Loading...
            </div>
            :
            <>
              <div className="grid grid-cols-4 gap-4">
                {
                  allProducts?.length > 0 ?
                  visibleProductCards?.map(product => (
                      <div key={product?.id} className="rounded border p-2 shadow">
                        <img width={"100%"} height={'200px'} src={product?.thumbnail} alt="" />
                        <div className="text-center">
                          <h3 className='text-xl font-bold'>{product?.title}</h3>
                          <Link className='bg-yellow-500 p-2 rounded-xl mt-3 text-white inline-block' to={`${product?.id}/view`}>View More...</Link>
                        </div>
                      </div>
                    ))
                    :
                    <div className="flex font-bold justify-center items-center text-red-600 my-5 text-lg ">
                      Product Not Found!!!
                    </div>
                }
              </div>
              <div className="text-center text-2xl font-bold mt-20">
                <span onClick={navigateToPrevpage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
                <span>{CurrentPage} Of {totalPage}</span>
                <span  onClick={navigateToNextpage} className="cursor-pointer"><i className="fa-solid fa-forward ms-5"></i></span>
              </div>
            </>
        }

      </div>
    </>
  )
}

export default Home