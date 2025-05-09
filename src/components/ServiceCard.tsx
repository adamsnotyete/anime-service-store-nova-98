
import React from "react";
import { ServiceCard as ServiceCardType } from "@/types";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: ServiceCardType;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <motion.div
      className="card-3d relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-80"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(155, 135, 245, 0.6)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      <img
        src={service.image}
        alt={service.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-right">
        <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">{service.name}</h3>
        <div className="flex justify-between items-center">
          <span className="bg-anime-bright-purple bg-opacity-80 px-3 py-1 rounded-full text-xs font-bold text-white shadow-glow">
            {service.duration}
          </span>
          <span className="text-yellow-300 font-bold text-lg drop-shadow-md">
            {service.price}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent hover:border-anime-purple rounded-lg transition-all duration-300 z-10 shadow-[inset_0_0_20px_rgba(155,135,245,0.3)]"></div>
    </motion.div>
  );
};

export default ServiceCard;
