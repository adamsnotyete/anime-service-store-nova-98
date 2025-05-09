
import React, { useState } from "react";
import { UserData } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<UserData>({
    username: "",
    userId: "",
    guild: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.userId && formData.guild) {
      login(formData);
    }
  };

  return (
    <div className="glass-card rounded-xl p-8 w-full max-w-md mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 gradient-text text-center">تسجيل الدخول</h2>
      <form onSubmit={handleSubmit} className="space-y-6 text-right">
        <div className="space-y-2">
          <Label htmlFor="username" className="block text-lg font-medium">
            لقبك
          </Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
            placeholder="مثال: يوليوس"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userId" className="block text-lg font-medium">
            رقمك
          </Label>
          <Input
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
            placeholder=":whatssap"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guild" className="block text-lg font-medium">
            نقابتك
          </Label>
          <Input
            id="guild"
            name="guild"
            value={formData.guild}
            onChange={handleChange}
            required
            className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
            placeholder=":  "
          />
        </div>
        <Button
          type="submit"
          className="w-full btn-gradient text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-purple-500/30"
        >
          الدخول إلى المتجر
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
