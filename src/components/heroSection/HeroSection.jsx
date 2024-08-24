import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";

const featuredProducts = [
  "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
  "src/assets/second.jpg",
  "src/assets/second.jpg"
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef(null);

  let count = 0;
  let slideInterval;

  const removeAnimation = () => {
    if (slideRef.current) {
      slideRef.current.classList.remove("fade-anim");
    }
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.addEventListener("animationend", removeAnimation);
      slideRef.current.addEventListener("mouseenter", pauseSlider);
      slideRef.current.addEventListener("mouseleave", startSlider);
    }

    startSlider();

    return () => {
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);

    if (slideRef.current) {
      slideRef.current.classList.add("fade-anim");
    }
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);

    if (slideRef.current) {
      slideRef.current.classList.add("fade-anim");
    }
  };

  return (
    <div ref={slideRef} className="w-full h-[576px] select-none relative">
      <div className="aspect-w-16 aspect-h-9 w-full h-[576px]">
        <img src={featuredProducts[currentIndex]} alt="" className="w-full h-[576px]" />
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnPrevClick}
        >
          <AiOutlineVerticalRight size={30} />
        </button>
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnNextClick}
        >
          <AiOutlineVerticalLeft size={30} />
        </button>
      </div>
    </div>
  );
}
