"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();

  const handleLogin = (role: 'admin' | 'lecturer') => {
    // In a real app, you'd handle authentication here
    router.push(`/${role}`);
  };

  return (
    <Card className="w-full max-w-sm mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" defaultValue="admin@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" defaultValue="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" onClick={() => handleLogin('admin')}>Login as Admin</Button>
        <Button variant="secondary" className="w-full" onClick={() => handleLogin('lecturer')}>Login as Lecturer</Button>
      </CardFooter>
    </Card>
  );
}
