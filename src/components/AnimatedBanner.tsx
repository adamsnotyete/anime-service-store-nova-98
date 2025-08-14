
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
        
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;
        
        banner.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      };
      
      const handleMouseLeave = () => {
        banner.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1)';
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
      className="w-full relative z-20 mb-10 mx-auto max-w-7xl px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div 
        ref={bannerRef}
        className="w-full h-80 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-pink-900/80 backdrop-blur-xl rounded-3xl overflow-hidden relative border border-purple-500/30 shadow-2xl shadow-purple-500/20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10 animate-pulse"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-500 tracking-wider drop-shadow-2xl">
              𝑲𝑶𝑹𝑨𝒀 🌑
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "300px", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/50 mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl text-purple-100 font-medium tracking-wide"
          >
            أفضل متجر للخدمات الأنمي
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-4 px-6 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm"
          >
            <span className="text-purple-200 text-sm font-medium">✨ مرحباً بكم في عالم الأنمي ✨</span>
          </motion.div>
        </div>
        
        {/* Stable decorative elements */}
        <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-500/30 backdrop-blur-sm border border-purple-300/20"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 backdrop-blur-sm border border-blue-300/20"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-500/30 backdrop-blur-sm border border-pink-300/20"></div>
      </div>
    </motion.div>
  );
};

export default AnimatedBanner;
