// src/features/auth/components/AuthHeader.tsx
import { HeartPulse } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <>
      <HeartPulse className="text-primary absolute left-20 top-6 hidden lg:block" size={40} />
      <div className="flex flex-col items-center gap-1 mb-6 text-center">
        <h1 className="font-bold text-3xl text-gray-900 font-header">{title}</h1>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </>
  );
}