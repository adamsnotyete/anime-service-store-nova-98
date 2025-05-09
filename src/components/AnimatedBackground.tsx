
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
          src="https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/190111_13_25-1_preview.webm"
          type="video/webm"
        />
        <source
          src="https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/190111_13_25-1_preview.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-anime-dark-purple/80 to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20"></div>
    </div>
  );
};

export default AnimatedBackground;
