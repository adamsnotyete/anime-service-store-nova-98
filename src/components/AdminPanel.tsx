import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, Edit, Users, ShoppingCart } from "lucide-react";

interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  guild: string;
  balance: number;
  is_admin: boolean;
  phone_number: string;
}

interface ServiceRequest {
  id: string;
  service_name: string;
  service_price: string;
  status: string;
  created_at: string;
  form_data: any;
  profiles: {
    username: string;
    phone_number: string;
    guild: string;
  };
}

const AdminPanel = () => {
  const { userProfile, createUserAccount } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  
  // نموذج إنشاء مستخدم جديد
  const [newUser, setNewUser] = useState({
    phoneNumber: "",
    password: "",
    username: "",
    guild: "",
    balance: 0
  });

  // نموذج تحديث الرصيد
  const [balanceUpdate, setBalanceUpdate] = useState({
    userId: "",
    amount: 0
  });

  useEffect(() => {
    if (userProfile?.is_admin) {
      fetchUsers();
      fetchRequests();
    }
  }, [userProfile]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          profiles:user_id (
            username,
            phone_number,
            guild
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await createUserAccount(
        newUser.phoneNumber,
        newUser.password,
        newUser.username,
        newUser.guild,
        newUser.balance
      );

      if (error) {
        throw error;
      }

      toast({
        title: "تم إنشاء الحساب",
        description: "تم إنشاء حساب المستخدم بنجاح",
      });

      setNewUser({
        phoneNumber: "",
        password: "",
        username: "",
        guild: "",
        balance: 0
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBalance = async (userId: string, newBalance: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "تم تحديث الرصيد",
        description: "تم تحديث رصيد المستخدم بنجاح",
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: "خطأ في تحديث الرصيد",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      toast({
        title: "تم حذف المستخدم",
        description: "تم حذف المستخدم بنجاح",
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: "خطأ في حذف المستخدم",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "تم تحديث حالة الطلب",
        description: `تم تغيير حالة الطلب إلى ${status}`,
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        title: "خطأ في تحديث الطلب",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!userProfile?.is_admin) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold gradient-text mb-4">غير مسموح</h2>
        <p>هذه الصفحة متاحة للمشرفين فقط</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-dark-purple via-anime-charcoal to-anime-dark-charcoal p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">لوحة إدارة المشرف</h1>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              إدارة المستخدمين
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              طلبات الخدمات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* نموذج إنشاء مستخدم جديد */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="gradient-text flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  إنشاء حساب جديد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">رقم المستخدم</Label>
                    <Input
                      id="phoneNumber"
                      value={newUser.phoneNumber}
                      onChange={(e) => setNewUser(prev => ({...prev, phoneNumber: e.target.value}))}
                      required
                      className="bg-opacity-20 bg-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser(prev => ({...prev, password: e.target.value}))}
                      required
                      className="bg-opacity-20 bg-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">اسم المستخدم</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser(prev => ({...prev, username: e.target.value}))}
                      required
                      className="bg-opacity-20 bg-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guild">النقابة</Label>
                    <Input
                      id="guild"
                      value={newUser.guild}
                      onChange={(e) => setNewUser(prev => ({...prev, guild: e.target.value}))}
                      required
                      className="bg-opacity-20 bg-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balance">الرصيد الابتدائي</Label>
                    <Input
                      id="balance"
                      type="number"
                      value={newUser.balance}
                      onChange={(e) => setNewUser(prev => ({...prev, balance: parseInt(e.target.value) || 0}))}
                      className="bg-opacity-20 bg-black"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" disabled={loading} className="btn-gradient w-full">
                      {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* قائمة المستخدمين */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="gradient-text">قائمة المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="glass-card p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="font-bold">{user.username}</p>
                          <p className="text-sm text-muted-foreground">{user.phone_number}</p>
                        </div>
                        <div>
                          <p>النقابة: {user.guild}</p>
                        </div>
                        <div>
                          <p>الرصيد: {user.balance.toLocaleString()}</p>
                        </div>
                        <div>
                          <Input
                            type="number"
                            placeholder="رصيد جديد"
                            className="bg-opacity-20 bg-black"
                            onChange={(e) => setBalanceUpdate({userId: user.user_id, amount: parseInt(e.target.value) || 0})}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateBalance(user.user_id, balanceUpdate.amount)}
                            className="btn-gradient"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!user.is_admin && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUser(user.user_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="gradient-text">طلبات الخدمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {requests.map((request) => (
                    <div key={request.id} className="glass-card p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-bold">{request.service_name}</p>
                          <p className="text-sm">السعر: {request.service_price}</p>
                          <p className="text-sm">المستخدم: {request.profiles.username}</p>
                        </div>
                        <div>
                          <p>الرقم: {request.profiles.phone_number}</p>
                          <p>النقابة: {request.profiles.guild}</p>
                        </div>
                        <div>
                          <p className={`font-bold ${
                            request.status === 'pending' ? 'text-yellow-400' :
                            request.status === 'approved' ? 'text-green-400' :
                            request.status === 'completed' ? 'text-blue-400' :
                            'text-red-400'
                          }`}>
                            {request.status === 'pending' ? 'في الانتظار' :
                             request.status === 'approved' ? 'مقبول' :
                             request.status === 'completed' ? 'مكتمل' : 'مرفوض'}
                          </p>
                          <p className="text-sm">{new Date(request.created_at).toLocaleDateString('ar')}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="btn-gradient text-xs"
                            onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                          >
                            قبول
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                          >
                            رفض
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-xs"
                            onClick={() => handleUpdateRequestStatus(request.id, 'completed')}
                          >
                            اكتمل
                          </Button>
                        </div>
                      </div>
                      {request.form_data && Object.keys(request.form_data).length > 0 && (
                        <div className="mt-2 p-2 bg-muted bg-opacity-20 rounded">
                          <p className="text-sm font-bold">بيانات إضافية:</p>
                          {Object.entries(request.form_data).map(([key, value]) => (
                            <p key={key} className="text-sm">{key}: {value as string}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;