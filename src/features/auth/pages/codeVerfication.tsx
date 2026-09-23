// src/features/auth/pages/VerificationCodePage.tsx
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';

export default function VerificationCodePage() {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

    const handleCodeChange = (index: number, value: string) => {
        // نأخذ الرقم الأخير فقط في حال الكتابة السريعة أو اللصق
        const digit = value.slice(-1);
        const newCode = [...verificationCode];
        newCode[index] = digit;
        setVerificationCode(newCode);

        // الانتقال تلقائياً للخانات التالية إذا تم إدخال رقم
        if (digit && index < 3) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newCode = [...verificationCode];
            
            // إذا كانت الخانة الحالية فارغة، نرجع للخانة السابقة ونمسحها
            if (!newCode[index] && index > 0) {
                newCode[index - 1] = '';
                setVerificationCode(newCode);
                const prevInput = document.getElementById(`otp-input-${index - 1}`);
                prevInput?.focus();
            } else {
                // مسح الخانة الحالية
                newCode[index] = '';
                setVerificationCode(newCode);
            }
        }
    };

    return (
        <AuthLayout>
            <AuthHeader 
                title="Code Verification" 
                subtitle="Code has been sent to the phone number. Check your phone." 
            />

            <form action="" className="flex flex-col gap-6 w-full">
                <div className="w-full flex justify-center">
                    <div className="flex gap-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={verificationCode[index] || ''}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                                className="w-14 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm bg-white"
                            />
                        ))}
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="bg-primary hover:bg-blue-700 text-white font-medium p-3 rounded-xl transition duration-200 text-sm shadow-sm"
                >
                    Verify
                </button>
            </form>
        </AuthLayout>
    );
}