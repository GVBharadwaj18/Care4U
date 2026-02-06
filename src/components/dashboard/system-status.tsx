import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockHospitals } from "@/lib/data";
import { Hospital as HospitalIcon, BedDouble, ShieldCheck } from "lucide-react";

export function SystemStatus() {
    const hospitalsNearby = mockHospitals.length;
    const icuCapable = mockHospitals.filter(h => h.capabilities.icuBedsAvailable > 0).length;
    // Define "Emergency Ready" as having available beds, operating rooms, and the 'Trauma' specialty.
    const emergencyReady = mockHospitals.filter(h => 
        h.capabilities.bedsAvailable > 5 && 
        h.capabilities.operatingRoomsAvailable > 0 &&
        h.capabilities.specialties.includes('Trauma')
    ).length;

    const statusItems = [
        { title: "Hospitals Nearby", value: hospitalsNearby, icon: HospitalIcon },
        { title: "ICU-Capable", value: icuCapable, icon: BedDouble },
        { title: "Emergency-Ready", value: emergencyReady, icon: ShieldCheck }
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">System Status</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {statusItems.map(item => (
                    <Card key={item.title} className="text-center">
                         <CardHeader className="pb-2">
                            <div className="mx-auto bg-primary/10 p-3 rounded-full">
                                <item.icon className="h-6 w-6 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold font-headline">{item.value}</p>
                            <p className="text-sm font-semibold text-muted-foreground">{item.title}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
