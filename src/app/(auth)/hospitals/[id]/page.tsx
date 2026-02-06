import { mockHospitals } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Bed, Clock, Stethoscope, BriefcaseMedical, MapPin, AlertTriangle, Users, Star, HeartPulse, ShieldCheck, Plane, Scan, ScanSearch, Bone, Waves, TestTube2, Gauge, ClipboardPen, BedDouble } from "lucide-react";
import { CapabilityCard } from "@/components/hospitals/capability-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const diagnosticTests = {
  "Imaging": [
    { name: "CT Scan", icon: Scan },
    { name: "MRI", icon: ScanSearch },
    { name: "X-Ray", icon: Bone },
    { name: "Ultrasound", icon: Waves },
  ],
  "Laboratory": [
    { name: "Blood Tests", icon: TestTube2 },
  ],
  "Monitoring": [
    { name: "ECG", icon: HeartPulse },
    { name: "Oxygen Monitoring", icon: Gauge },
  ],
  "Other Diagnostics": [
      { name: "Biopsy", icon: ClipboardPen }
  ]
};

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  const hospital = mockHospitals.find((h) => h.id === params.id);

  if (!hospital) {
    notFound();
  }
  
  const placeholderImage = PlaceHolderImages.find(p => p.id === hospital.id) ?? PlaceHolderImages[0];
  const icuAvailability = hospital.capabilities.icuBedsAvailable > 5 
    ? 'Good' 
    : hospital.capabilities.icuBedsAvailable > 0 
    ? 'Limited' 
    : 'None';
  
  const emergencyWardReady = hospital.capabilities.specialties.includes('Trauma');

  return (
    <div>
        <div className="relative h-60 w-full md:h-72">
            <Image
                src={placeholderImage.imageUrl}
                alt={hospital.name}
                data-ai-hint={placeholderImage.imageHint}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="container mx-auto px-4 md:px-6">
              <div className="absolute bottom-6 text-white space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold font-headline">{hospital.name}</h1>
                  <p className="flex items-center gap-2 text-lg text-slate-200">
                      <MapPin className="h-5 w-5" /> {hospital.address} ({hospital.distance} mi away)
                  </p>
              </div>
            </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
            <div className="space-y-8">
                
                <div className="grid md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-2 space-y-6">
                         {hospital.isAiRecommended && hospital.aiRecommendationReason && (
                            <Card className="bg-accent/10 border-accent/50">
                              <CardHeader>
                                  <CardTitle className="flex items-center gap-2 text-accent-foreground font-headline">
                                    <Star className="fill-accent text-accent" /> Most Suitable for This Situation
                                  </CardTitle>
                                  <CardDescription>Chosen based on emergency readiness and facilities, not ratings.</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-foreground/90"><span className="font-semibold text-accent-foreground">Reason:</span> {hospital.aiRecommendationReason}</p>
                              </CardContent>
                            </Card>
                        )}
                         <Card>
                            <CardContent className="p-6 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                                <p className="text-amber-800">
                                <strong>Disclaimer:</strong> Availability is estimated and may vary. In a real medical emergency, always call local emergency services.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full">
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}`} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button size="lg" className="w-full h-16 text-lg">
                                <MapPin className="mr-3 h-6 w-6" /> Get Directions
                            </Button>
                        </a>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">What this hospital can handle</h2>
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <ShieldCheck className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="font-medium text-sm">Emergency Care</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <BedDouble className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="font-medium text-sm">ICU Support</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Scan className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="font-medium text-sm">CT Scans & MRI</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <TestTube2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="font-medium text-sm">Blood Tests</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 justify-center">
                            <p className="text-xs text-muted-foreground">
                                Facilities listed are typically available and may vary.
                            </p>
                        </CardFooter>
                    </Card>
                </div>

                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Capacity & Wait Times</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        <CapabilityCard 
                            icon={Clock}
                            title="Est. Wait Time"
                            value={`~${hospital.estimatedWaitTime}`}
                            unit="min"
                            description="Time to see a doctor"
                        />
                        <CapabilityCard 
                            icon={Bed}
                            title="Available Beds"
                            value={hospital.capabilities.bedsAvailable}
                            description="General ward beds"
                        />
                        <CapabilityCard 
                            icon={Users}
                            title="ICU Availability"
                            value={icuAvailability}
                            description="Intensive Care Unit"
                        />
                         <CapabilityCard 
                            icon={ShieldCheck}
                            title="Emergency Ward"
                            value={emergencyWardReady ? "Ready" : "N/A"}
                            description="For critical cases"
                        />
                    </div>
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Operations & Specialties</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline flex items-center gap-2">
                                    <Stethoscope /> Key Specializations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {hospital.capabilities.specialties.map(specialty => (
                                        <Badge key={specialty} variant="secondary" className="text-sm px-3 py-1">{specialty}</Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                            <CapabilityCard 
                                icon={BriefcaseMedical}
                                title="Operating Rooms"
                                value={hospital.capabilities.operatingRoomsAvailable}
                                description="Surgical availability"
                            />
                             <CapabilityCard 
                                icon={HeartPulse}
                                title="Doctors"
                                value={"On Call"}
                                description="Emergency specialists"
                            />
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Diagnostic Tests Available</h2>
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {Object.entries(diagnosticTests).map(([category, tests]) => (
                                <div key={category}>
                                    <h3 className="text-lg font-semibold mb-3">{category}</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {tests.map(test => (
                                            <div key={test.name} className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                                                <test.icon className="h-5 w-5 text-primary" />
                                                <span className="text-sm font-medium">{test.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-muted-foreground pt-4 text-center">
                                Test availability may vary based on hospital operations.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            Other Capabilities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm font-medium flex items-center gap-2">
                         <Plane className="h-5 w-5 text-primary" />
                         Helicopter Landing Pad: {hospital.capabilities.hasHelicopterLandingPad ? 
                         <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Yes</Badge> : 
                         <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">No</Badge>}
                       </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    </div>
  );
}
