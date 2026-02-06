'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockUser, mockProfile } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  conditions: z.string().optional(),
  allergies: z.string().optional(),
  emergencyContactName: z.string().min(1, 'Contact name is required'),
  emergencyContactPhone: z.string().min(1, 'Contact phone is required'),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
      conditions: mockProfile.conditions.join(', '),
      allergies: mockProfile.allergies.join(', '),
      emergencyContactName: mockProfile.emergencyContacts[0].name,
      emergencyContactPhone: mockProfile.emergencyContacts[0].phone,
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
        toast({
            title: 'Profile Updated',
            description: 'Your medical and personal information has been saved.',
        });
        setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
      <div className="space-y-2 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          User & Medical Profile
        </h1>
        <p className="text-muted-foreground">
          Keep your information up-to-date for faster assistance.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <Separator />
            
            <CardHeader>
              <CardTitle>Medical Details</CardTitle>
              <CardDescription>
                Provide details that could be critical in an emergency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Existing Medical Conditions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Hypertension, Asthma" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Penicillin, Peanuts" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
            
            <Separator />

            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
