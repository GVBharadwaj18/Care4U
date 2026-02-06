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

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <SignupForm />
          </CardContent>
        </Card>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
