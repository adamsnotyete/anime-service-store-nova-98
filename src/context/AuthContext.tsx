import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  guild: string;
  balance: number;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (phoneNumber: string, password: string, username: string, guild: string) => Promise<{ error: any }>;
  signIn: (phoneNumber: string, password: string) => Promise<{ error: any }>;
  createUserAccount: (phoneNumber: string, password: string, username: string, guild: string, balance?: number) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (phoneNumber: string, password: string, username: string, guild: string) => {
    // منع المستخدمين العاديين من التسجيل
    return { error: { message: "التسجيل متاح للمشرفين فقط" } };
  };

  const signIn = async (phoneNumber: string, password: string) => {
    // البحث عن المستخدم بالرقم أولاً
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('phone_number', phoneNumber)
      .single();

    if (profileError || !profileData) {
      return { error: { message: "رقم المستخدم غير موجود" } };
    }

    // محاولة تسجيل الدخول باستخدام رقم كـ email مؤقت
    const tempEmail = `${phoneNumber}@temp.local`;
    const { error } = await supabase.auth.signInWithPassword({
      email: tempEmail,
      password,
    });
    
    return { error };
  };

  const createUserAccount = async (phoneNumber: string, password: string, username: string, guild: string, balance: number = 0) => {
    // التحقق من أن المستخدم الحالي مشرف
    if (!userProfile?.is_admin) {
      return { error: { message: "غير مسموح - مشرفين فقط" } };
    }

    // إنشاء حساب مؤقت باستخدام رقم كـ email
    const tempEmail = `${phoneNumber}@temp.local`;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: tempEmail,
      password,
      options: {
        data: {
          username,
          guild,
          phone_number: phoneNumber
        }
      }
    });

    if (authError) {
      return { error: authError };
    }

    // تحديث الرصيد إذا تم تحديده
    if (balance > 0 && authData.user) {
      await supabase
        .from('profiles')
        .update({ balance })
        .eq('user_id', authData.user.id);
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      userProfile, 
      loading, 
      signUp, 
      signIn, 
      signOut,
      createUserAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};