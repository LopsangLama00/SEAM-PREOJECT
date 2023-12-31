import React from 'react'
import BasicExample from './CardItem'
import Img1 from '../../assets/images/banner6.jpg';
import Img2 from '../../assets/images/banner8.jpg';
import Img3 from '../../assets/images/banner9.jpg';
import Img4 from '../../assets/images/laptop.jpg';
import Img5 from '../../assets/images/bike.jpg';
import Img6 from '../../assets/images/applewatch.jpg';
import Img7 from '../../assets/images/iphone 11.jpg';


export default function CardContainer() {

  const BackgroundSection = {
    backgroundColor: "light",
    borderRadius: "20px"
  }
  return (
    <>
        <div className="container-fluid " >
            <div className="section p-4" style={BackgroundSection}>
                <span className = "section-title fw-bold " > Category </span>
                <div className="section-body d-flex gap-5 justify-content-space-between flex-wrap">
                    <BasicExample image={Img4} Title="Laptop" />
                    <BasicExample image={Img5} Title="Bike" />
                    <BasicExample image={Img6} Title="Applewatch" />
                    <BasicExample image={Img7} Title="Smart phone" />
                    

                </div>
            </div>


        </div>
    
    </>
  )
}
