import type { Hospital } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, ShieldCheck } from "lucide-react";
import Link from "next/link";

type HospitalSnapshotCardProps = {
    hospital: Hospital;
}

export function HospitalSnapshotCard({ hospital }: HospitalSnapshotCardProps) {
    // An "Emergency Ready" hospital has available beds, operating rooms, and key trauma specialties.
    const isEmergencyReady = hospital.capabilities.bedsAvailable > 5 && 
                             hospital.capabilities.operatingRoomsAvailable > 0 &&
                             hospital.capabilities.specialties.includes('Trauma');

    const isIcuCapable = hospital.capabilities.icuBedsAvailable > 0;

    return (
        <Link href={`/hospitals/${hospital.id}`} className="block">
            <Card className="hover:bg-secondary/50 transition-colors h-full">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-headline">{hospital.name}</CardTitle>
                    <p className="text-sm font-bold text-primary whitespace-nowrap">{hospital.distance} mi</p>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-2">
                    {isEmergencyReady && (
                        <Badge className="bg-accent text-accent-foreground border-none">
                            <ShieldCheck className="mr-1 h-3 w-3"/>
                            Emergency-Ready
                        </Badge>
                    )}
                    {isIcuCapable && (
                        <Badge variant="secondary">
                             <BedDouble className="mr-1 h-3 w-3"/>
                            ICU Capable
                        </Badge>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
