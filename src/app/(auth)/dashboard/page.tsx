'use client';

import { SystemStatus } from "@/components/dashboard/system-status";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
      <div className="space-y-2 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          System Dashboard
        </h1>
        <p className="text-muted-foreground">
          An overview of the regional healthcare system status.
        </p>
      </div>

      <Separator className="my-8" />

      {/* SECTION 3: SYSTEM STATUS */}
      <SystemStatus />
    </div>
  );
}
