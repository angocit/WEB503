import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "react-slick";
import Slider from 'react-slick'
import { Link } from 'react-router-dom';
import "./style.css"
import { useQuery } from '@tanstack/react-query';
import { ListData } from '../../services/data';
import { ISlide } from '../../interface/slide';
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
      const {data,isLoading} = useQuery<ISlide[]>({
        queryKey:["sliders"],
        queryFn:async()=>{
            const {data} = await ListData("sliders")
            return data
        }
      })
  return (
    <div className="slider-container">
      {(isLoading)?<>Loading...</>:
      <Slider {...settings}>
        { (data)&&data.map(item=>(
          <div className='relative' key={item.id}>
            <img src={item.image} />
              <div className='content'>
                  <label>{item.label}</label>
                  <h3>{item.caption}</h3>
                  <Link className='bg-red-700 px-4 py-2 rounded text-white max-w-[120px] mx-auto uppercase font-bold' to={item.url}>Mua ngay</Link>
              </div>
          </div>
          ))
        }
      </Slider>
        }
    </div>
  )
}

export default HomeSlide