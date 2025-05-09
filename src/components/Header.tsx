
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { isLoggedIn, userData, logout } = useAuth();

  return (
    <header className="py-4 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">متجر الأنمي</h1>
        {isLoggedIn && userData ? (
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-right">
              <p className="font-semibold text-xl">{userData.username}</p>
              <p className="text-sm text-muted-foreground">{userData.guild}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="border border-purple-500 hover:bg-purple-900 hover:bg-opacity-30"
            >
              تسجيل الخروج
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
