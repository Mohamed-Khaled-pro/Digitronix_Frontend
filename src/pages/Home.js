import React from 'react'
import HeroSec from '../components/HeroSec'
import ProductsPage from './ProductsPage'
import Footer from '../components/Footer'
import Secure from '../components/Secure'
import AdSlider from '../components/Slider'
import AuthButtons from '../components/LoginButtons'
export default function Home({favourites , setFavourites}) {
  return (
    <div>
    <HeroSec />
    <AdSlider />
    <ProductsPage favourites={favourites} setFavourites={setFavourites} />
    <Secure />
    <AuthButtons />
    <Footer />
    </div>
  )
}
