"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterDialog } from './register-dialog';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<"admin" | "lecturer" | null>(null);

  const handleLogin = (role: 'admin' | 'lecturer') => {
    setIsLoading(role);
    // In a real app, you'd handle authentication here
    // We'll simulate a network delay
    setTimeout(() => {
      router.push(`/${role}`);
      setIsLoading(null);
    }, 1000);
  };
  
  const isFormDisabled = !!isLoading;

  return (
    <Card className="w-full max-w-sm mt-10 shadow-lg bg-card/90">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required disabled={isFormDisabled} />
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type={showPassword ? 'text' : 'password'} required disabled={isFormDisabled}/>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-7 h-7 w-7"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isFormDisabled}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" onClick={() => handleLogin('admin')} disabled={isFormDisabled}>
          {isLoading === 'admin' ? <Loader2 className="animate-spin" /> : <span className="px-0.5">Login as Admin</span>}
        </Button>
        <Button variant="secondary" className="w-full" onClick={() => handleLogin('lecturer')} disabled={isFormDisabled}>
          {isLoading === 'lecturer' ? <Loader2 className="animate-spin" /> : <span className="px-0.5">Login as Lecturer</span>}
        </Button>
        <RegisterDialog />
      </CardFooter>
    </Card>
  );
}
