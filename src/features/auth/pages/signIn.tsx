// src/features/auth/pages/SignInPage.tsx
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';

export default function SignInPage() {
    const [phone, setPhone] = useState('');

    return (
        <AuthLayout>
            <AuthHeader 
                title="Sign in" 
                subtitle="Please enter your phone number" 
            />

            <form action="" className="flex flex-col gap-4 w-full">
                <div className="w-full">
                    <PhoneInput 
                        defaultCountry='eg'
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputClassName="!w-full !border-none !bg-transparent !text-sm !shadow-none !outline-none focus:!ring-0"
                        className="flex items-center w-full rounded-xl border border-gray-200 px-3 py-2 bg-white shadow-sm focus-within:border-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="bg-primary hover:bg-blue-700 text-white font-medium p-3 rounded-xl transition duration-200 text-sm"
                >
                    Sign in
                </button>

                <div className="relative flex items-center justify-center my-2">
                    <div className="absolute bg-white px-3 text-xs text-gray-400">or</div>
                    <div className="w-full border-t border-gray-100"></div>
                </div>

                <button 
                    type="button" 
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium p-3 rounded-xl flex justify-center items-center gap-2 transition duration-200 text-sm"
                >
                    <img src="/src/assets/flat-color-icons_google.svg" className="w-5 h-5" alt="google" /> 
                    Sign in with Google
                </button>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Don't have an account? <a href="/register" className="text-blue-600 font-medium">Sign up</a>
                </p>
            </form>
        </AuthLayout>
    );
}