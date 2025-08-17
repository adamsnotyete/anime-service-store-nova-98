import React from "react";
import AdminPanel from "@/components/AdminPanel";
import AnimatedBackground from "@/components/AnimatedBackground";

const ControlPage = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <AdminPanel />
      </div>
    </div>
  );
};

export default ControlPage;