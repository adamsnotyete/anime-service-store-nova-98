
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();

  return (
    <header className="py-4 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">متجر الأنمي</h1>
        {user && userProfile ? (
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-right">
              <p className="font-semibold text-xl">{userProfile.username}</p>
              <p className="text-sm text-muted-foreground">{userProfile.guild}</p>
              <p className="text-sm text-yellow-400">الرصيد: {userProfile.balance} ريال</p>
            </div>
            <div className="flex items-center gap-2">
              {userProfile?.is_admin && (
                <Button 
                  onClick={() => window.location.href = '/admin'}
                  className="btn-gradient text-sm"
                >
                  لوحة الإدارة
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={signOut}
                className="border border-purple-500 hover:bg-purple-900 hover:bg-opacity-30"
              >
                تسجيل الخروج
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
