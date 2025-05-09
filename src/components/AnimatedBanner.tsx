
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initEffect = () => {
      if (!bannerRef.current) return;
      
      const banner = bannerRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = banner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        banner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      
      const handleMouseLeave = () => {
        banner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      };
      
      banner.addEventListener('mousemove', handleMouseMove);
      banner.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        banner.removeEventListener('mousemove', handleMouseMove);
        banner.removeEventListener('mouseleave', handleMouseLeave);
      };
    };
    
    initEffect();
  }, []);
  
  return (
    <motion.div 
      className="w-full relative z-20 mb-10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div 
        ref={bannerRef}
        className="w-full h-72 bg-gradient-to-r from-purple-900/60 via-indigo-700/60 to-purple-800/60 backdrop-blur-lg rounded-2xl overflow-hidden relative transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center transform transition-all duration-500" style={{ transform: 'translateZ(50px)' }}>
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4 tracking-wider"
          >
            NOVA STORE
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 text-lg text-white/80"
          >
            أفضل متجر للخدمات الأنمي
          </motion.p>
        </div>
        
        {/* 3D elements floating in the background */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-500/20 backdrop-blur-md" style={{ transform: 'translateZ(20px)' }}></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 rounded-full bg-pink-500/20 backdrop-blur-md" style={{ transform: 'translateZ(30px)' }}></div>
        <div className="absolute top-20 right-40 w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-md" style={{ transform: 'translateZ(10px)' }}></div>
      </div>
    </motion.div>
  );
};

export default AnimatedBanner;
