import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Hero extends Component {
  render() {
    return (
      <div className='flex flex-row'>
        
        <div className='w-[1000px] h-[400px] m-6 select-none relative'>
        <Carousel interval={3000}>
          <Carousel.Item>
            <img
              alt="..."
              src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
              className="w-[1000px] h-[400px]"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              alt="..."
              src="src/assets/second.jpg"
              className="w-[1000px] h-[400px]"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              alt="..."
              src="src/assets/second.jpg"
              className="w-[1000px] h-[400px]"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              className="w-[1000px] h-[400px]"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              className="w-[1000px] h-[400px]"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='mr-6 flex flex-col'>
        <img
              alt="..."
              src="src/assets/p1.avif"
              className="mb-6 mt-6  w-[500px] h-[190px]"
            />
        <img
              alt="..."
              src="src/assets/p2.avif"
              className="w-[500px] h-[190px]"
            />
        </div>
      </div>
      
    );
  }
}

export default Hero;
