
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceCard, FormField } from "@/types";
import { serviceFormFields } from "@/data/services";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ServiceModalProps {
  service: ServiceCard | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!service || !userProfile) return;
    
    // تحويل السعر إلى رقم للمقارنة
    const priceValue = parseFloat(service.price.replace(/[km]/gi, '').replace(/,/g, '')) * 
      (service.price.toLowerCase().includes('m') ? 1000000 : 
       service.price.toLowerCase().includes('k') ? 1000 : 1);

    // التحقق من الرصيد
    if (userProfile.balance < priceValue) {
      toast({
        title: "رصيد غير كافي",
        description: `رصيدك الحالي: ${userProfile.balance.toLocaleString()}. مطلوب: ${priceValue.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // إدراج الطلب في قاعدة البيانات
      const { error } = await supabase
        .from('service_requests')
        .insert([
          {
            user_id: userProfile.user_id,
            service_id: service.id,
            service_name: service.name,
            service_price: service.price,
            form_data: formValues,
            status: 'pending'
          }
        ]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم مراجعة طلبك والرد عليك قريباً",
        duration: 5000,
      });
      onClose();
      setFormValues({});
    } catch (error) {
      toast({
        title: "فشل في إرسال الطلب",
        description: "يرجى المحاولة مرة أخرى لاحقًا",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service) return null;

  const fields = serviceFormFields[service.id] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-lg mx-auto rounded-xl z-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text text-center mb-4">
            {service.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between mb-6">
          <div>
            <span className="text-yellow-400 font-bold text-xl">{service.price}</span>
          </div>
          <div>
            <span className="bg-blue-600 bg-opacity-70 px-3 py-1 rounded-full text-sm">
              {service.duration}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-right">
          {fields.length === 0 ? (
            <div className="text-center p-4 bg-muted bg-opacity-30 rounded-lg">
              <p className="text-foreground">سيتم معالجة الطلب تلقائيًا</p>
            </div>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="block text-lg font-medium">
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={formValues[field.id] || ""}
                    onValueChange={(value) => handleChange(field.id, value)}
                  >
                    <SelectTrigger className="w-full bg-opacity-20 bg-black rounded-lg border border-purple-400 border-opacity-30">
                      <SelectValue placeholder="اختر..." />
                    </SelectTrigger>
                    <SelectContent className="bg-anime-dark-charcoal border border-purple-400 border-opacity-30 rounded-lg">
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                    className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                  />
                )}
              </div>
            ))
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full btn-gradient text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg mt-6 hover:shadow-lg hover:shadow-purple-500/30"
          >
            {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
