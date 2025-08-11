import { LoginForm } from '@/components/auth/login-form';
import { BookCopy } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
          <BookCopy className="h-10 w-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Welcome to TimeTableSync
        </h1>
      </div>
      <LoginForm />
    </main>
  );
}
