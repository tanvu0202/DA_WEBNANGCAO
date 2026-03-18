import React from 'react';
import { Link } from 'react-router-dom';

export default function ImageComponent() {
  return (
    <div className="flex gap-4">
      <Link to='' className="">
        <img
          src="http://steamark.monamedia.net/wp-content/uploads/2023/07/lo%CC%A3%CC%82-tri%CC%80nh-ho%CC%A3c-robot-steam-2048x639.jpg"
          alt="Image 1"
          className="w-full h-auto"
        />
      </Link>
      <Link to='' className="flex-1/3">
        <img
          src="http://steamark.monamedia.net/wp-content/uploads/2023/07/gac.jpg"
          alt="Image 2"
          className="w-full h-auto"
        />
      </Link>
      <Link to='' className="flex-1/3">
        <img
          src="http://steamark.monamedia.net/wp-content/uploads/2023/07/llv.jpg"
          alt="Image 3"
          className="w-full h-auto"
        />
      </Link>
    </div>
  );
}
