import React from 'react'
import HeroSec from '../components/HeroSec'
import ProductsPage from './ProductsPage'
import Footer from '../components/Footer'
import Secure from '../components/Secure'
import AdSlider from '../components/Slider'
import AuthButtons from '../components/LoginButtons'
import FixedPhoto from '../components/FixedPhoto'
export default function Home({ darkMode}) {
  return (
    <div>
    <HeroSec />
    <FixedPhoto darkMode = {darkMode} />
    <ProductsPage/>
        <div className='my-56'>
    <Secure />
    </div>
    <div className='my-56'>
    <AdSlider />
    </div>
    <AuthButtons />
    <Footer />
    </div>
  )
}
