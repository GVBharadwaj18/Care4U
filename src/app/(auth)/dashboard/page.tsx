'use client';

import { SystemStatus } from "@/components/dashboard/system-status";
import { EmergencyActions } from "@/components/dashboard/emergency-actions";
import { NearbyHospitals } from "@/components/dashboard/nearby-hospitals";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Users, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Healthcare Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your personal health hub for finding and managing medical care
        </p>
      </div>

      {/* Alert */}
      <Alert className="mb-8 border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Welcome back! Your complete health profile and medical history are securely stored.
        </AlertDescription>
      </Alert>

      <Separator className="my-8" />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <Card className="border-0 shadow-sm hover:shadow-md transition">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
              <div className="rounded-full bg-orange-100 p-2">
                <Heart className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground mt-1">Up to date</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <div className="rounded-full bg-blue-100 p-2">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">82%</p>
            <p className="text-xs text-muted-foreground mt-1">Good</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Doctors</CardTitle>
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground mt-1">In network</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <EmergencyActions />
      </div>

      {/* Nearby Hospitals */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Nearby Hospitals</h2>
        <NearbyHospitals />
      </div>

      {/* System Status */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Regional Healthcare System</h2>
        <SystemStatus />
      </div>
    </div>
  );
}
