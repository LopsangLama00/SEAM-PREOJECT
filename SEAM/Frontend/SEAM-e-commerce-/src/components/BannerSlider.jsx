import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Img1 from '../assets/images/banner6.jpg';
import Img2 from '../assets/images/banner8.jpg';
import Img3 from '../assets/images/banner9.jpg';



function DarkVariantExample() {
    const image = {
        height : "270px",
        objectFit:"fill",
        padding: "15px"
    }
    const carousel = {
      marginTop:"60px"
    }
  return (
    <>
    <div className="container-fluid ">
      <Carousel data-bs-theme="light"  style={carousel}>
        <Carousel.Item>
          <img
            className="d-block w-100 " 
            style = {image}
            src={Img1}
            alt="First slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style = {image}
            src={Img2}
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style = {image}
            src={Img3}
            alt="Third slide"
          />

        </Carousel.Item>
      </Carousel>
    </div>
    </>
  );
}

export default DarkVariantExample;