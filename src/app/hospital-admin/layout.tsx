import { Logo } from '@/components/layout/logo';
import { UserNav } from '@/components/layout/user-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 shadow-sm backdrop-blur-lg">
            <div className="container mx-auto flex h-16 items-center px-4 sm:px-6">
                <Logo />
                 <div className="ml-auto flex items-center gap-4">
                    <p className="text-sm font-medium text-muted-foreground hidden sm:block">Admin Portal</p>
                    <UserNav />
                </div>
            </div>
        </header>
        <main className="flex-1 py-12">
            <div className="container mx-auto">
                {children}
            </div>
        </main>
    </div>
  );
}
