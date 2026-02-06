'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@citygeneral.com',
      password: 'password',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call for admin authentication
    setTimeout(() => {
      // In a real app, you would have a proper admin authentication flow
      if (values.email === 'admin@citygeneral.com' && values.password === 'password') {
        toast({
            title: 'Admin Login Successful',
            description: 'Redirecting to your hospital dashboard...',
        });
        router.push('/hospital-admin/dashboard');
      } else {
        toast({
            title: 'Login Failed',
            description: 'Invalid admin credentials.',
            variant: 'destructive',
        });
        setIsLoading(false);
      }
    }, 1000);
  }

  return (
    <div className="flex items-center justify-center">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">Hospital Admin Portal</CardTitle>
                <CardDescription>Sign in to manage your hospital's live status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Email</FormLabel>
                          <FormControl>
                            <Input placeholder="admin@hospital.com" {...field} />
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
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In as Admin
                    </Button>
                  </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
