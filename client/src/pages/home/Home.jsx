import React from 'react'
import Hero from './Hero'
import Blogs from '../blogs/Blogs'
import MainCategories from '../../components/MainCategories'

const Home = () => {
  return (
    <div className='bg-white text-primary container mx-auto mt-8 p-8'>
      <Hero></Hero>
      <Blogs/>
    </div>
  )
}

export default Home