
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
    order_time: new Date().toISOString()
  };

  try {
    const response = await emailjs.send(
      "service_q59qzgq", 
      "template_wnkrdfm", 
      templateParams,
      "YOUR_USER_ID" // This should be replaced with an actual EmailJS user ID
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, error };
  }
};
