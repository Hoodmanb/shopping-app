"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from '@/app/assets/css-files/dashboard.css'

import { Pagination } from 'swiper/modules';

import Home from "./Home";

export default function HomeSwiper() {
  const icons = ['home', 'category', 'chat_bubble', 'shopping_cart', 'person'];
  const pagination = {
    el: '.custom-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} ${index === 2 ? 'center' : 'side'} material-symbols-outlined">${icons[index]}</span>`;
    }
  };

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className='mySwiper'
        touchRatio={0}
        simulateTouch={false}
        slideToClickedSlide={true}
      >
        <SwiperSlide className='mySwiperSlide'><Home /></SwiperSlide>
        <SwiperSlide className='mySwiperSlide'>Slide 2</SwiperSlide>
        <SwiperSlide className='mySwiperSlide'>Slide 3</SwiperSlide>
        <SwiperSlide className='mySwiperSlide'>Slide 4</SwiperSlide>
        <SwiperSlide className='mySwiperSlide'>Slide 5</SwiperSlide>
      </Swiper>
      <div className='custom-pagination'></div>
    </div>
  );
}
