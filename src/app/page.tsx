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
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          The smart, automated solution for generating lecturer timetables. Sign in to access your dashboard.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
