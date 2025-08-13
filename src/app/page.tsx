import { LoginForm } from '@/components/auth/login-form';
import { BookCopy } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4">
          <Image src="/logo.png" alt="YCCE TTMS Logo" width={80} height={80} className="h-20 w-20 rounded-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Welcome to YCCE TTMS
        </h1>
      </div>
      <LoginForm />
    </main>
  );
}
