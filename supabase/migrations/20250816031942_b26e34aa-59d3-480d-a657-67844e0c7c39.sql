-- إضافة عمود phone_number للمستخدمين
ALTER TABLE public.profiles ADD COLUMN phone_number TEXT UNIQUE;

-- إضافة فهرس لتحسين الأداء
CREATE INDEX idx_profiles_phone_number ON public.profiles(phone_number);

-- تحديث دالة التعامل مع المستخدمين الجدد
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, guild, phone_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'مستخدم جديد'),
    COALESCE(NEW.raw_user_meta_data->>'guild', 'بدون نقابة'),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', NULL)
  );
  RETURN NEW;
END;
$$;

-- إضافة policy للإدراج (للمشرفين فقط)
CREATE POLICY "Only admins can insert profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- إضافة policy للحذف (للمشرفين فقط)
CREATE POLICY "Only admins can delete profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- إضافة policy للتحديث (للمشرفين أو صاحب الحساب)
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile or admins can update any"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- إضافة policy للمشاهدة (للمشرفين أو صاحب الحساب)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile or admins can view all"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- جدول طلبات الخدمات
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  service_id INTEGER NOT NULL,
  service_name TEXT NOT NULL,
  service_price TEXT NOT NULL,
  form_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إدراج RLS للجدول الجديد
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- policies لجدول الطلبات
CREATE POLICY "Users can view their own requests"
ON public.service_requests
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Users can insert their own requests"
ON public.service_requests
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Only admins can update requests"
ON public.service_requests
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- إضافة دالة لتحديث الباقة المالية
CREATE OR REPLACE FUNCTION public.deduct_balance(user_id_param UUID, amount_param NUMERIC)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_balance NUMERIC;
BEGIN
  -- التحقق من الرصيد الحالي
  SELECT balance INTO current_balance
  FROM public.profiles
  WHERE user_id = user_id_param;
  
  -- التحقق من وجود رصيد كافي
  IF current_balance IS NULL OR current_balance < amount_param THEN
    RETURN FALSE;
  END IF;
  
  -- خصم المبلغ
  UPDATE public.profiles
  SET balance = balance - amount_param,
      updated_at = now()
  WHERE user_id = user_id_param;
  
  RETURN TRUE;
END;
$$;

-- دالة لإضافة رصيد
CREATE OR REPLACE FUNCTION public.add_balance(user_id_param UUID, amount_param NUMERIC)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET balance = balance + amount_param,
      updated_at = now()
  WHERE user_id = user_id_param;
  
  RETURN TRUE;
END;
$$;

-- إضافة trigger للتحديث التلقائي للوقت
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();