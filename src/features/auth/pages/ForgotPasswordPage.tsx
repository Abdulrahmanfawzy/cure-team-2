// src/features/auth/pages/ForgotPasswordPage.tsx
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import { forgotPasswordApi } from '../api/auth-api';
import { PATHS } from '../../../app/router/paths';

const forgotPasswordSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });

const { mutate: forgotPassword, isPending, isError, error } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (_, variables) => {
      // تخزين البيانات في الـ sessionStorage فوراً لمنع أي تأخير أو فقدان في الـ state
      sessionStorage.setItem("forgot_phone", variables.phone);
      sessionStorage.setItem("auth_flow", "forgot-password");

      navigate(PATHS.codeVerfication, { 
        replace: true, // استخدام replace بيمنع إن صفحة اللوجن أو الـ forgot تدخل في الـ history بالخطأ
        state: { 
          phone: variables.phone, 
          flow: 'forgot-password' 
        } 
      });
    },
    onError: (err: any) => {
      console.error('Forgot Password Error:', err.response?.data);
    },
  });
  const onSubmit = (data: { phone: string }) => {
    forgotPassword(data);
    navigate(PATHS.codeVerfication, { 
      state: { phone: data.phone, type: 'reset-password' } 
    });
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Forgot Password" 
        subtitle="Enter your phone number and we'll send you a verification code to reset your password." 
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="phone" className="font-medium text-sm text-gray-700">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput 
                defaultCountry='eg'
                value={field.value}
                onChange={field.onChange}
                inputClassName="!w-full !border-none !bg-transparent !text-sm !shadow-none !outline-none focus:!ring-0"
                className="flex items-center w-full rounded-xl border border-gray-200 px-3 py-2 bg-white shadow-sm focus-within:border-blue-500"
                placeholder='Enter your phone number'
              />
            )}
          />
          {errors.phone && <span className="text-xs text-red-500">{String(errors.phone.message)}</span>}
        </div>

        {isError && (
          <p className="text-xs text-red-500 text-center">
            {(error as any)?.response?.data?.message || 'Something went wrong, please try again'}
          </p>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="bg-primary hover:bg-blue-700 text-white font-medium p-3 rounded-xl transition duration-200 text-sm mt-2 disabled:opacity-50"
        >
          {isPending ? 'Sending Code...' : 'Send OTP'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          Remembered your password? <a href={PATHS.signIn} className="text-blue-600 font-medium">Sign in</a>
        </p>
      </form>
    </AuthLayout>
  );
}