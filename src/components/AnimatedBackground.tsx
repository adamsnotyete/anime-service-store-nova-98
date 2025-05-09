
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://assets.codepen.io/3364143/7btrrd.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.codepen.io/3364143/7btrrd.webm"
          type="video/webm"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-anime-dark-purple/80 to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20"></div>
    </div>
  );
};

export default AnimatedBackground;
