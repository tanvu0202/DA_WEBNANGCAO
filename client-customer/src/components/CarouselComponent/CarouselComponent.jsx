import React from 'react';
import { Carousel } from 'antd';

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
          src="http://steamark.monamedia.net/wp-content/uploads/2023/07/lo%CC%A3%CC%82-tri%CC%80nh-ho%CC%A3c-robot-scaled.jpg"
          alt="Image 2"
          className='w-full h-[400px] object-cover'
        />
      </div>
      <div>
        <img
          src="http://steamark.monamedia.net/wp-content/uploads/2023/07/ISA-scaled.jpg"
          alt="Image 1"
          className='w-full h-[400px] object-cover'
        />
      </div>
      
      <div>
        <img
          src="http://steamark.monamedia.net/wp-content/uploads/2023/07/BO%CC%A3%CC%82-HO%CC%A3C-CU%CC%A3-JELLO-1-scaled.jpg"
          alt="Image 3"
          className='w-full h-[400px] object-cover'
        />
      </div>
    </Carousel>
  );
}
