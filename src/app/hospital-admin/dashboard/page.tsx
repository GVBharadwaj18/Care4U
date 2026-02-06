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
  CardFooter
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockHospitals } from '@/lib/data';
import { Loader2, Bed, BedDouble, Siren, Clock } from 'lucide-react';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

// For demonstration, we'll hardcode the management of 'City General Hospital'.
// In a real app, this would be determined by the logged-in admin's credentials.
const hospitalToManage = mockHospitals.find(h => h.id === 'city-general-hospital');

const updateSchema = z.object({
  bedsAvailable: z.number().min(0, "Value cannot be negative.").max(100),
  icuBedsAvailable: z.number().min(0, "Value cannot be negative.").max(50),
  operatingRoomsAvailable: z.number().min(0, "Value cannot be negative.").max(20),
  estimatedWaitTime: z.number().min(0, "Value cannot be negative.").max(300),
});

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, you'd fetch and update this data via an API.
  const [hospitalData, setHospitalData] = useState(hospitalToManage);

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: hospitalData ? {
        bedsAvailable: hospitalData.capabilities.bedsAvailable,
        icuBedsAvailable: hospitalData.capabilities.icuBedsAvailable,
        operatingRoomsAvailable: hospitalData.capabilities.operatingRoomsAvailable,
        estimatedWaitTime: hospitalData.estimatedWaitTime,
    } : {},
  });

  function onSubmit(values: z.infer<typeof updateSchema>) {
    setIsLoading(true);
    console.log("Updating hospital status with values:", values);
    
    // Simulate an API call to save the data.
    setTimeout(() => {
        // In a real app, you'd get a confirmation from the server.
        // Here, we just update the local state for demonstration.
        setHospitalData(prev => prev ? ({
            ...prev,
            capabilities: {
                ...prev.capabilities,
                bedsAvailable: values.bedsAvailable,
                icuBedsAvailable: values.icuBedsAvailable,
                operatingRoomsAvailable: values.operatingRoomsAvailable,
            },
            estimatedWaitTime: values.estimatedWaitTime
        }) : undefined);

        toast({
            title: 'Status Updated',
            description: `Live status for ${hospitalData?.name} has been successfully updated.`,
        });
        setIsLoading(false);
    }, 1000);
  }

  if (!hospitalData) {
      return (
        <Card>
            <CardHeader>
                <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Could not load hospital data to manage. Please log out and try again.</p>
            </CardContent>
        </Card>
      )
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Live Status for <span className="text-primary">{hospitalData.name}</span>
        </h1>
        <p className="text-muted-foreground">
          Adjust the sliders to reflect the current operational status of your hospital.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Update Live Availability</CardTitle>
                    <CardDescription>Changes will be reflected across the Care4U platform immediately.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-12 pt-8">
                    <FormField
                        control={form.control}
                        name="bedsAvailable"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold"><Bed /> General Ward Beds Available</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            min={0} max={100} step={1}
                                            value={[field.value]}
                                            onValueChange={(value) => field.onChange(value[0])}
                                        />
                                        <span className="font-bold text-2xl w-16 text-center">{field.value}</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icuBedsAvailable"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold"><BedDouble /> ICU Beds Available</FormLabel>
                                 <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            min={0} max={50} step={1}
                                            value={[field.value]}
                                            onValueChange={(value) => field.onChange(value[0])}
                                        />
                                        <span className="font-bold text-2xl w-16 text-center">{field.value}</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="operatingRoomsAvailable"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold"><Siren /> Operating Rooms Free</FormLabel>
                                 <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            min={0} max={20} step={1}
                                            value={[field.value]}
                                            onValueChange={(value) => field.onChange(value[0])}
                                        />
                                        <span className="font-bold text-2xl w-16 text-center">{field.value}</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="estimatedWaitTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold"><Clock /> Estimated ER Wait Time (minutes)</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            min={0} max={300} step={5}
                                            value={[field.value]}
                                            onValueChange={(value) => field.onChange(value[0])}
                                        />
                                        <span className="font-bold text-2xl w-16 text-center">{field.value}</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-6">
                     <Button type="submit" disabled={isLoading} size="lg">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Publish Live Status
                    </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
    </div>
  );
}
