import React from 'react';
import { Carousel } from 'antd';

import banner1 from './banner1.png';
import banner2 from './banner2.png';
import banner3 from './banner3.png';
import banner4 from './banner4.png';

export default function CarouselComponent() {
  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <Carousel autoplay>
        <div>
        <img
          src={banner1}
          alt="Image 2"
          className='w-full h-[400px] object-cover'
        />
      </div>
      <div>
        <img
          src={banner2}
          alt="Image 1"
          className='w-full h-[400px] object-cover'
        />
      </div>
      
      <div>
        <img
          src={banner3}
          alt="Image 3"
          className='w-full h-[400px] object-cover'
        />
      </div>

            <div>
        <img
          src={banner4}
          alt="Image 4"
          className='w-full h-[400px] object-cover'
        />
      </div>
    </Carousel>
  );
}
