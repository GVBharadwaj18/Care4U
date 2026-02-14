import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/layout/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto grid min-h-[calc(100vh-4rem)] items-center px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 lg:py-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  Join Care4U
                </h1>
              </div>
              <p className="max-w-[600px] text-lg text-muted-foreground">
                Create your account to access medical emergency services, book appointments, and manage your health profile securely.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                  <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Secure Medical Records</h3>
                  <p className="text-sm text-muted-foreground">Your health information is encrypted and protected</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                  <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Multiple User Types</h3>
                  <p className="text-sm text-muted-foreground">Register as a patient, doctor, or administrator</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                  <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Access</h3>
                  <p className="text-sm text-muted-foreground">Access your health information anytime, anywhere</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                <CardDescription>
                  Enter your details below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
