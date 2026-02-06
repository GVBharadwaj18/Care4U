import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/layout/logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <Link href="/signup" className="text-sm font-medium text-primary hover:underline">
          Create an Account
        </Link>
      </header>
      <main className="flex-1">
        <div className="container mx-auto grid min-h-[calc(100vh-5rem)] items-center px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 lg:py-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Clarity in Crisis.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Care4U helps you find the right hospital in a medical emergency. Get estimated wait times, check hospital capabilities, and use our voice assistant for stress-free searching.
              </p>
            </div>
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 !text-red-600" />
              <AlertTitle className="font-bold !text-red-800">Medical Disclaimer</AlertTitle>
              <AlertDescription className="!text-red-700">
                This is not a substitute for professional medical advice. In a life-threatening emergency, always call your local emergency number immediately. All hospital data is an estimate and not guaranteed.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Sign In</CardTitle>
                <CardDescription>
                  Access your dashboard to find emergency care.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
