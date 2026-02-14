import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/layout/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <Link href="/signup" className="text-sm font-medium text-primary hover:underline">
            Create an Account
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto grid min-h-[calc(100vh-4rem)] items-center px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 lg:py-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  Clarity in Crisis.
                </h1>
              </div>
              <p className="max-w-[600px] text-lg text-muted-foreground">
                Care4U helps you find the right hospital in a medical emergency. Get estimated wait times, check hospital capabilities, and use our AI voice assistant for stress-free searching.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Real-time Hospital Data</h3>
                  <p className="text-sm text-muted-foreground">Up-to-date information on hospital availability and wait times</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Symptom Checker</h3>
                  <p className="text-sm text-muted-foreground">Get intelligent recommendations based on your symptoms</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Voice Assistant Support</h3>
                  <p className="text-sm text-muted-foreground">Hands-free search when you need it most</p>
                </div>
              </div>
            </div>

            <Alert variant="destructive" className="bg-red-50 border-red-200 mt-8">
              <AlertCircle className="h-4 w-4 !text-red-600" />
              <AlertTitle className="font-bold !text-red-800">Medical Disclaimer</AlertTitle>
              <AlertDescription className="!text-red-700">
                This is not a substitute for professional medical advice. In a life-threatening emergency, call 911 immediately. All hospital data is an estimate.
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your medical profile and book appointments
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
