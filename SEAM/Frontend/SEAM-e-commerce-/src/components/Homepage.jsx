import React from 'react'
import NavScrollExample from './Navbar'
import DarkVariantExample from './BannerSlider'
import CardContainer from './CategoryContainer/CardContainer'
import GetProductTest from './Products/GetProductTest'



export default function Homepage() {


  return (
    <>
    <div className="Mainbody" >
    <DarkVariantExample />
    <CardContainer />
    <GetProductTest />
    <br/>
    <br/>
    </div>
    </>
  )
}
