import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import SearchBar from '../../components/search/SearchBar'
import Hero from '../../components/heroSection/Hero'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'




const Home = () => {
  
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }

  return ( 
    <div>
      <Layout>
        {/* <HeroSection></HeroSection> */}
        {/* <div className="flex gap-5 justify-center">
        <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
        <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
      </div> */}
      {/* <div className='m-6'>
      </div> */}
      <Hero></Hero>
        <Filter></Filter>
        <ProductCard></ProductCard>
        <Track></Track>
      </Layout>
    </div>
  )
}

export default Home
