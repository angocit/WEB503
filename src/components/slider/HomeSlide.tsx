import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "react-slick";
import Slider from 'react-slick'
import { Link } from 'react-router-dom';
import "./style.css"
const HomeSlide = () => {
    const settings:Settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        autoplaySpeed:5000,
        autoplay:true
      };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className='relative'>
          <img src={"https://feelingteaonline.com/wp-content/uploads/2023/07/zalo-3.jpg"} />
            <div className='content'>
                <label>Label 1</label>
                <h3>Trà sữa TLINK, uống là thích</h3>
                <Link to={'#'}>Mua ngay</Link>
            </div>
        </div>
        <div className='relative'>
          <img src={"https://cdn-www.vinid.net/2020/05/be195fb4-20200501_appvinid_bannerweb_toocha.jpg"} />
          <div className='content'>
                <label>Label 2</label>
                <h3>Trà sữa TLINK, uống là thích 2</h3>
                <Link to={'#'}>Mua ngay</Link>
            </div>
        </div>
        <div className='relative'>
          <img src={"https://yihetang.com.vn/public/upload/1.jpg"} />
          <div className='content'>
                <label>Label 3</label>
                <h3>Trà sữa TLINK, uống là thích 3</h3>
                <Link to={'#'}>Mua ngay</Link>
            </div>
        </div>
      </Slider>
    </div>
  )
}

export default HomeSlide