
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
          src="https://cdn.pixabay.com/vimeo/766941759/anime-142778.mp4?width=1280&hash=e42f48687735c683878fee9d0e6cb7c577bcfd18"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-anime-dark-purple/80 to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20"></div>
    </div>
  );
};

export default AnimatedBackground;
