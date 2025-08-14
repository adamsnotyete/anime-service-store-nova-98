
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import ServicesGrid from "@/components/ServicesGrid";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedBanner from "@/components/AnimatedBanner";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const [showBanner, setShowBanner] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'personal' | 'guild'>('personal');

  // Handle scroll effect for banner
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBanner(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative z-10 flex flex-col" dir="rtl">
      <AnimatedBackground />
      
      {isLoggedIn && showBanner && <AnimatedBanner />}
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex-grow">
        <Header />
        
        <main className="max-w-7xl mx-auto">
          {isLoggedIn ? (
            <>
              <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2 gradient-text">مرحبًا بك في متجر nova</h2>
                <p className="text-xl text-gray-300 max-w-3xl">
                </p>
              </div>
              
              {/* Category Buttons */}
              <div className="flex justify-center gap-6 mb-10">
                <Button
                  onClick={() => setActiveCategory('personal')}
                  className={`px-10 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform ${
                    activeCategory === 'personal' ? 'category-btn-active' : 'category-btn-inactive'
                  }`}
                >
                  الجزء الشخصي
                </Button>
                <Button
                  onClick={() => setActiveCategory('guild')}
                  className={`px-10 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform ${
                    activeCategory === 'guild' ? 'category-btn-active' : 'category-btn-inactive'
                  }`}
                >
                  جزء النقابات
                </Button>
              </div>
              
              <ServicesGrid category={activeCategory} />
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[70vh]">
              <LoginForm />
            </div>
          )}
        </main>
      </div>
      
      <footer className="relative z-10 py-4 text-center text-gray-400 bg-black bg-opacity-50">
        <div className="container mx-auto">
          <p>&copy; 2025 متجر adam - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
