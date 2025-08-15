
import React from "react";
import { ServiceCard as ServiceCardType } from "@/types";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ServiceCardProps {
  service: ServiceCardType;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: "0 10px 25px rgba(155, 135, 245, 0.6)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Failed to load image: ${target.src}`);
            target.src = "https://cdn.lovable.dev/anime/anime-default.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      <div className="p-4 text-right">
        <h3 className="text-xl font-bold mb-3 text-white">{service.name}</h3>
        <div className="flex justify-between items-center">
          <span className="bg-purple-600 bg-opacity-80 px-3 py-1 rounded-full text-xs font-semibold text-white">
            {service.duration}
          </span>
          <span className="text-yellow-300 font-bold text-lg">
            {service.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
