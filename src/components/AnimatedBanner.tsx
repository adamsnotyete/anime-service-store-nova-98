
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
        className="w-full h-96 relative overflow-hidden rounded-3xl border border-purple-400/20 shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/30 via-transparent to-orange-900/30"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <polygon points="10,2 18,7 18,17 10,22 2,17 2,7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" className="text-purple-300"/>
          </svg>
        </div>
        
        {/* Main content area */}
        <div className="relative z-10 h-full flex items-center justify-between px-12">
          {/* Left side - Main title */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <div className="mb-4">
              <span className="text-purple-300 text-sm font-medium tracking-wider uppercase">Welcome to</span>
            </div>
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 mb-4 leading-none">
              𝑲𝑶𝑹𝑨𝒀
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌑</span>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
            </div>
            <p className="text-purple-200 text-lg font-medium">
              أفضل متجر للخدمات الأنمي
            </p>
          </motion.div>
          
          {/* Right side - Decorative elements */}
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 flex justify-end items-center"
          >
            <div className="relative">
              {/* Large decorative circle */}
              <div className="w-64 h-64 rounded-full border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-purple-300/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-6xl animate-pulse">⭐</span>
                  </div>
                </div>
              </div>
              
              {/* Floating particles around the circle */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-400/40 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 rounded-full bg-pink-400/40 animate-bounce delay-500"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 rounded-full bg-cyan-400/40 animate-bounce delay-1000"></div>
              <div className="absolute -top-8 right-1/3 w-3 h-3 rounded-full bg-purple-300/40 animate-bounce delay-1500"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
        />
      </div>
    </motion.div>
  );
};

export default AnimatedBanner;
