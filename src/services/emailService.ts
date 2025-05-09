import emailjs from 'emailjs-com';
import { ServiceRequest } from '@/types';

export const sendServiceRequest = async (serviceRequest: ServiceRequest) => {
  const { userData, serviceName, servicePrice, serviceDuration, additionalData } = serviceRequest;
  
  const templateParams = {
    to_email: "adamstar344@gmail.com",
    user_name: userData.username,
    user_id: userData.userId,
    guild: userData.guild,
    product_title: serviceName,
    product_price: servicePrice,
    product_duration: serviceDuration,
    order_details: Object.entries(additionalData)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", "),
    order_time: new Date().toLocaleString('ar-SA') // Arabic locale format
  };

  try {
    // Initialize with your PUBLIC API KEY (not user ID)
    emailjs.init('2eDZ98gp0veMlfBKo');
    
    const response = await emailjs.send(
      "service_q59qzgq",  // Your EmailJS Service ID
      "template_wnkrdfm", // Your EmailJS Template ID
      templateParams
    );
    
    return { success: true, data: response };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
};
