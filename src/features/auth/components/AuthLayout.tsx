import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-white min-h-screen w-full flex overflow-hidden relative">
      {/* left side (Form Container) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center z-10 px-6 py-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

      {/* right side (Images) */}
      <div className="hidden lg:flex lg:w-1/2 relative justify-end items-center">
        <img 
          src="/src/assets/main2.svg" 
          alt="" 
          className="absolute right-0 top-0 h-full object-cover" 
        />
        <img 
          src="/src/assets/main.svg" 
          alt="" 
          className="absolute right-0 h-full object-cover" 
        />
      </div>
    </div>
  );
}