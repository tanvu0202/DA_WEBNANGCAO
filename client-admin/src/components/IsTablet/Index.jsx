import React, { Component } from 'react';
import bgAnimate from './bg_animate.json';
import Lottie from "lottie-react";
import { FaDesktop, FaMobileAlt } from 'react-icons/fa'; // Importing icons

class IsTablet extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-full max-w-md">
          <Lottie animationData={bgAnimate} loop={true} />
        </div>
        <div className="mt-10 text-center space-y-4">
          <h2 className="flex items-center justify-center font-semibold text-2xl text-gray-800">
            <FaDesktop className="mr-2 text-3xl text-gray-700" />
            Desktop Access Required
          </h2>
          <p className="text-lg text-gray-600">
            We currently do not support tablet or mobile devices.
          </p>
          <p className="text-lg text-gray-600">
            Please access from a desktop for the best experience.
          </p>
          <h3 className="flex items-center justify-center font-medium text-xl text-primary mt-4">
            <FaMobileAlt className="mr-2 text-2xl text-primary" />
            Mobile support is coming soon!
          </h3>
        </div>
      </div>
    );
  }
}

export default IsTablet;
