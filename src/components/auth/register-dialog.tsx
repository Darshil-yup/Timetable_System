
"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }).refine(
    (email) => email.endsWith('@gmail.com') || email.endsWith('@ycce.in'),
    { message: "Email must be a @gmail.com or @ycce.in address." }
  ),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const PasswordStrengthIndicator = ({ strength }: { strength: { value: number; label: string; color: string } }) => {
    if (!strength.label) return null;

    return (
        <div className="space-y-2">
            <Progress value={strength.value} colorClassName={strength.color} className="h-2" />
            <p className={cn("text-xs font-medium", strength.color.replace('bg-', 'text-'))}>
                {strength.label}
            </p>
        </div>
    )
}

type PasswordStrength = {
    value: number;
    label: string;
    color: string;
};

export function RegisterDialog({ children }: { children?: React.ReactNode }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ value: 0, label: '', color: '' });


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange"
  });
  
  const password = form.watch("password");

  useEffect(() => {
    if (typeof window !== 'undefined') {
        let score = 0;
        if (!password) {
            setPasswordStrength({ value: 0, label: '', color: '' });
            return;
        }

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        
        let strength: PasswordStrength;
        switch (score) {
            case 0:
            case 1:
            case 2:
                strength = { value: (score / 5) * 100, label: "Weak", color: "bg-destructive" };
                break;
            case 3:
                strength = { value: 65, label: "Medium", color: "bg-yellow-500" };
                break;
            case 4:
            case 5:
                strength = { value: 100, label: "Strong", color: "bg-green-500" };
                break;
            default:
                strength = { value: 0, label: '', color: '' };
        }
        setPasswordStrength(strength);
    }
  }, [password]);


  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);

    // In a real app, you would handle user registration here.
    // We'll simulate a network delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created!",
        description: "You can now log in with your new credentials.",
      });
      setIsOpen(false);
      form.reset();
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        form.reset();
      }
    }}>
      <DialogTrigger asChild>
        {children || <Button variant="outline" className="w-full"><span className="px-0.5">Create Account</span></Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription>
            Create a new lecturer account. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordStrengthIndicator strength={passwordStrength} />

            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                <span className="px-0.5">{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
