
export interface UserData {
  username: string;
  userId: string;
  guild: string;
}

export interface ServiceCard {
  id: number;
  name: string;
  price: string;
  duration: string;
  image: string;
}

export interface ServiceRequest {
  serviceId: number;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  userData: UserData;
  additionalData: Record<string, string>;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "select" | "number";
  required: boolean;
  options?: string[];
}
