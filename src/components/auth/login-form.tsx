
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from 'lucide-react';
import dynamic from 'next/dynamic';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RegisterDialog = dynamic(() => import('./register-dialog').then(mod => mod.RegisterDialog), {
  loading: () => <Button className="w-full" disabled>Create Account</Button>
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'lecturer'>('lecturer');

  const handleLogin = () => {
    setIsLoading(true);
    // In a real app, you'd handle authentication here
    // We'll simulate a network delay
    setTimeout(() => {
      router.push(`/${role}`);
      setIsLoading(false);
    }, 1000);
  };
  
  const isFormDisabled = isLoading;

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
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} required disabled={isFormDisabled} className="pr-10" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isFormDisabled}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
            <Label>Role</Label>
            <RadioGroup defaultValue="lecturer" onValueChange={(value) => setRole(value as 'admin' | 'lecturer')} className="grid grid-cols-2 gap-4" disabled={isFormDisabled}>
                <div>
                    <RadioGroupItem value="lecturer" id="lecturer" className="peer sr-only" />
                    <Label htmlFor="lecturer" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Lecturer
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                    <Label htmlFor="admin" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Admin
                    </Label>
                </div>
            </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" onClick={handleLogin} disabled={isFormDisabled}>
          {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
        </Button>
        <div className="text-sm text-muted-foreground pt-2 text-center">
          {"Haven't signed up yet? "}
          <RegisterDialog>
             <span className="underline cursor-pointer font-semibold text-primary/90">
                Create an account
            </span>
          </RegisterDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
