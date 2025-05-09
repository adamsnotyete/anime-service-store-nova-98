
import React, { useState } from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import { ServiceCard as ServiceCardType } from "@/types";
import { motion } from "framer-motion";

const ServicesGrid: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceCardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleCardClick = (service: ServiceCardType) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const handleImageLoaded = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  React.useEffect(() => {
    // Preload images
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
      img.onload = handleImageLoaded;
    });
  }, []);

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => handleCardClick(service)}
          />
        ))}
      </motion.div>
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default ServicesGrid;
