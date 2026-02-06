import type { Hospital } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Bed, BedDouble, Brain, Clock, Heart, HeartPulse, MapPin, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type HospitalCardProps = {
  hospital: Hospital;
};

const specialtyIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    "Cardiology": Heart,
    "Neurology": Brain,
    "Stroke Center": Brain,
    "Trauma": HeartPulse,
    "Neurosurgery": Brain,
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  const waitTimeColor = hospital.estimatedWaitTime > 60 ? "text-destructive" : "text-green-600";
  
  const isEmergencyReady = hospital.capabilities.bedsAvailable > 5 && 
                           hospital.capabilities.operatingRoomsAvailable > 0 &&
                           hospital.capabilities.specialties.includes('Trauma');

  const isIcuCapable = hospital.capabilities.icuBedsAvailable > 0;

  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all", hospital.isAiRecommended && "border-accent border-2 shadow-lg")}>
      {hospital.isAiRecommended && (
        <div className="flex items-center gap-2 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent-foreground border-b border-accent/20">
            <Star className="h-4 w-4 fill-accent" />
            <span>Most Suitable for This Situation</span>
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-xl">{hospital.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {hospital.distance} mi away
                </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-1 text-sm shrink-0 ml-4">
                <div className={`font-bold flex items-center gap-1 ${waitTimeColor}`}>
                    <Clock className="h-4 w-4" /> ~{hospital.estimatedWaitTime} min
                </div>
                 <div className="font-bold flex items-center gap-1">
                    <Bed className="h-4 w-4" /> {hospital.capabilities.bedsAvailable} beds
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {hospital.isAiRecommended && hospital.aiRecommendationReason && (
             <div className="text-sm bg-secondary/50 p-3 rounded-md border text-foreground">
                <p><span className="font-bold text-accent-foreground">Reason:</span> {hospital.aiRecommendationReason}</p>
             </div>
        )}
        
        <div className="flex items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
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
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <TooltipProvider>
                    {hospital.capabilities.specialties.map(specialty => {
                        const Icon = specialtyIcons[specialty];
                        if (!Icon) return null;
                        return (
                            <Tooltip key={specialty}>
                                <TooltipTrigger asChild>
                                    <div className="p-2 bg-secondary rounded-full cursor-pointer">
                                        <Icon className="h-4 w-4 text-secondary-foreground" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{specialty}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </TooltipProvider>
            </div>
        </div>

      </CardContent>
      <CardFooter className="bg-secondary/30 p-4 mt-auto">
        <Link href={`/hospitals/${hospital.id}`} className="w-full">
          <Button variant="outline" className="w-full bg-background">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
