import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const { signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    username: "",
    guild: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      const { error } = await signIn(loginData.email, loginData.password);
      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في متجر الأنمي",
        });
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.email && signupData.password && signupData.username && signupData.guild) {
      const { error } = await signUp(
        signupData.email,
        signupData.password,
        signupData.username,
        signupData.guild
      );
      if (error) {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-8 w-full max-w-md mx-auto animate-fade-in">
        <div className="text-center">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-8 w-full max-w-md mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 gradient-text text-center">متجر الأنمي</h2>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-6 text-right">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-lg font-medium">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-lg font-medium">
                كلمة المرور
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                placeholder="كلمة المرور"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-purple-500/30"
            >
              الدخول إلى المتجر
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignup} className="space-y-6 text-right">
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="block text-lg font-medium">
                البريد الإلكتروني
              </Label>
              <Input
                id="signup-email"
                name="email"
                type="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
                className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="block text-lg font-medium">
                كلمة المرور
              </Label>
              <Input
                id="signup-password"
                name="password"
                type="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
                className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                placeholder="كلمة المرور"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-username" className="block text-lg font-medium">
                اسم المستخدم
              </Label>
              <Input
                id="signup-username"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                required
                className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                placeholder="مثال: يوليوس"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-guild" className="block text-lg font-medium">
                النقابة
              </Label>
              <Input
                id="signup-guild"
                name="guild"
                value={signupData.guild}
                onChange={handleSignupChange}
                required
                className="w-full bg-opacity-20 bg-black p-3 rounded-lg border border-purple-400 border-opacity-30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-right"
                placeholder="اسم النقابة"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-purple-500/30"
            >
              إنشاء حساب جديد
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginForm;