
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
        preload="auto"
      >
        <source
          src="https://cdn.lovable.dev/animations/anime-night-city.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Anime wallpaper overlay */}
      <div className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/1357772.jpg')] bg-cover bg-center opacity-20"></div>
      
      {/* Gradient overlays for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-black/70 to-black/90"></div>
      <div className="absolute inset-0 anime-bg-overlay"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 floating-particles"></div>
      
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20"></div>
    </div>
  );
};

export default AnimatedBackground;
