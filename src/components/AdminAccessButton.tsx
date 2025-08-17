import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminAccessButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const SECRET_CODE = "11082007";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (code === SECRET_CODE) {
      toast({
        title: "تم التحقق بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
      setIsOpen(false);
      setCode("");
      navigate("/control");
    } else {
      toast({
        title: "كود خاطئ",
        description: "الرجاء إدخال الكود الصحيح",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="glass-card border-white/20 hover:bg-white/10 text-white"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="gradient-text">دخول المشرف</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">الكود السري</Label>
              <Input
                id="code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="أدخل الكود السري"
                className="bg-opacity-20 bg-black"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="btn-gradient w-full"
            >
              {loading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccessButton;